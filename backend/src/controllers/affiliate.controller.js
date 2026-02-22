const prisma = require('../config/database');
const crypto = require('crypto');

// Affiliate başvurusu yap
exports.applyForAffiliate = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Zaten affiliate partner mı kontrol et
    const existing = await prisma.affiliatePartner.findUnique({
      where: { userId }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Zaten bir affiliate başvurunuz mevcut',
        data: existing
      });
    }

    // Benzersiz referral code oluştur
    let referralCode;
    let isUnique = false;
    while (!isUnique) {
      referralCode = crypto.randomBytes(4).toString('hex').toUpperCase();
      const existingCode = await prisma.affiliatePartner.findUnique({
        where: { referralCode }
      });
      if (!existingCode) isUnique = true;
    }

    const { bankName, accountHolder, iban } = req.body;

    const affiliate = await prisma.affiliatePartner.create({
      data: {
        userId,
        referralCode,
        bankName,
        accountHolder,
        iban,
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            fullName: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Affiliate başvurunuz alındı. Onay bekliyor.',
      data: affiliate
    });
  } catch (error) {
    next(error);
  }
};

// Kendi affiliate bilgilerini getir
exports.getMyAffiliateInfo = async (req, res, next) => {
  try {
    const affiliate = await prisma.affiliatePartner.findUnique({
      where: { userId: req.user.id },
      include: {
        _count: {
          select: {
            referrals: true,
            commissions: true
          }
        }
      }
    });

    if (!affiliate) {
      return res.status(404).json({
        success: false,
        message: 'Affiliate partner kaydınız bulunamadı'
      });
    }

    // İstatistikler
    const stats = {
      totalReferrals: affiliate.totalReferrals,
      activeReferrals: await prisma.referral.count({
        where: {
          affiliateId: affiliate.id,
          hasSubscribed: true
        }
      }),
      totalEarnings: affiliate.totalEarnings,
      pendingEarnings: affiliate.pendingEarnings,
      paidEarnings: affiliate.paidEarnings,
      unpaidCommissions: await prisma.affiliateCommission.count({
        where: {
          affiliateId: affiliate.id,
          isPaid: false
        }
      })
    };

    res.json({
      success: true,
      data: {
        ...affiliate,
        stats
      }
    });
  } catch (error) {
    next(error);
  }
};

// Kendi referral linkini getir
exports.getMyReferralLink = async (req, res, next) => {
  try {
    const affiliate = await prisma.affiliatePartner.findUnique({
      where: { userId: req.user.id }
    });

    if (!affiliate) {
      return res.status(404).json({
        success: false,
        message: 'Affiliate partner kaydınız bulunamadı'
      });
    }

    if (affiliate.status !== 'ACTIVE') {
      return res.status(403).json({
        success: false,
        message: 'Affiliate hesabınız aktif değil'
      });
    }

    const frontendUrl = process.env.FRONTEND_URL || 'https://defneqr.com';
    const referralLink = `${frontendUrl}/auth/register?ref=${affiliate.referralCode}`;

    res.json({
      success: true,
      data: {
        referralCode: affiliate.referralCode,
        referralLink
      }
    });
  } catch (error) {
    next(error);
  }
};

// Kendi referrallarını listele
exports.getMyReferrals = async (req, res, next) => {
  try {
    const affiliate = await prisma.affiliatePartner.findUnique({
      where: { userId: req.user.id }
    });

    if (!affiliate) {
      return res.status(404).json({
        success: false,
        message: 'Affiliate partner kaydınız bulunamadı'
      });
    }

    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [referrals, total] = await Promise.all([
      prisma.referral.findMany({
        where: { affiliateId: affiliate.id },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          referredUser: {
            select: {
              fullName: true,
              email: true,
              createdAt: true
            }
          }
        }
      }),
      prisma.referral.count({ where: { affiliateId: affiliate.id } })
    ]);

    res.json({
      success: true,
      data: referrals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Kendi komisyonlarını listele
exports.getMyCommissions = async (req, res, next) => {
  try {
    const affiliate = await prisma.affiliatePartner.findUnique({
      where: { userId: req.user.id }
    });

    if (!affiliate) {
      return res.status(404).json({
        success: false,
        message: 'Affiliate partner kaydınız bulunamadı'
      });
    }

    const { page = 1, limit = 20, isPaid } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { affiliateId: affiliate.id };
    if (isPaid !== undefined) {
      where.isPaid = isPaid === 'true';
    }

    const [commissions, total] = await Promise.all([
      prisma.affiliateCommission.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.affiliateCommission.count({ where })
    ]);

    res.json({
      success: true,
      data: commissions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Banka bilgilerini güncelle
exports.updateBankInfo = async (req, res, next) => {
  try {
    const { bankName, accountHolder, iban } = req.body;

    const affiliate = await prisma.affiliatePartner.update({
      where: { userId: req.user.id },
      data: {
        bankName,
        accountHolder,
        iban
      }
    });

    res.json({
      success: true,
      message: 'Banka bilgileriniz güncellendi',
      data: affiliate
    });
  } catch (error) {
    next(error);
  }
};

// === ADMIN ROUTES ===

// Tüm affiliate partnerları listele (Admin)
exports.getAllAffiliates = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (status) {
      where.status = status;
    }

    const [affiliates, total] = await Promise.all([
      prisma.affiliatePartner.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              fullName: true,
              email: true
            }
          },
          _count: {
            select: {
              referrals: true,
              commissions: true
            }
          }
        }
      }),
      prisma.affiliatePartner.count({ where })
    ]);

    res.json({
      success: true,
      data: affiliates,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Affiliate başvurusunu onayla/reddet (Admin)
exports.updateAffiliateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const affiliate = await prisma.affiliatePartner.update({
      where: { id },
      data: {
        status,
        approvedBy: status === 'ACTIVE' ? req.user.id : null,
        approvedAt: status === 'ACTIVE' ? new Date() : null
      },
      include: {
        user: {
          select: {
            fullName: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: `Affiliate ${status === 'ACTIVE' ? 'onaylandı' : 'güncellendi'}`,
      data: affiliate
    });
  } catch (error) {
    next(error);
  }
};

// Affiliate ayarlarını getir (Admin)
exports.getAffiliateSettings = async (req, res, next) => {
  try {
    let settings = await prisma.affiliateSettings.findFirst();

    if (!settings) {
      // İlk ayarları oluştur
      settings = await prisma.affiliateSettings.create({
        data: {}
      });
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// Affiliate ayarlarını güncelle (Admin)
exports.updateAffiliateSettings = async (req, res, next) => {
  try {
    const { commissionRate, minimumPayout, isEnabled, requireApproval, cookieDuration } = req.body;

    let settings = await prisma.affiliateSettings.findFirst();

    if (!settings) {
      // İlk ayarları oluştur
      settings = await prisma.affiliateSettings.create({
        data: {
          commissionRate,
          minimumPayout,
          isEnabled,
          requireApproval,
          cookieDuration
        }
      });
    } else {
      settings = await prisma.affiliateSettings.update({
        where: { id: settings.id },
        data: {
          commissionRate,
          minimumPayout,
          isEnabled,
          requireApproval,
          cookieDuration
        }
      });
    }

    res.json({
      success: true,
      message: 'Affiliate ayarları güncellendi',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// Ödeme oluştur (Admin)
exports.createPayout = async (req, res, next) => {
  try {
    const { affiliateId, commissionIds, method, notes } = req.body;

    // Affiliate bilgilerini al
    const affiliate = await prisma.affiliatePartner.findUnique({
      where: { id: affiliateId }
    });

    if (!affiliate) {
      return res.status(404).json({
        success: false,
        message: 'Affiliate partner bulunamadı'
      });
    }

    // Komisyonları al
    const commissions = await prisma.affiliateCommission.findMany({
      where: {
        id: { in: commissionIds },
        affiliateId,
        isPaid: false
      }
    });

    if (commissions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Ödenecek komisyon bulunamadı'
      });
    }

    const totalAmount = commissions.reduce((sum, c) => sum + c.amount, 0);

    // Payout oluştur
    const payout = await prisma.$transaction(async (tx) => {
      const newPayout = await tx.affiliatePayout.create({
        data: {
          affiliateId,
          amount: totalAmount,
          commissionIds: commissionIds,
          method,
          bankName: affiliate.bankName,
          accountHolder: affiliate.accountHolder,
          iban: affiliate.iban,
          notes,
          status: 'PENDING',
          processedBy: req.user.id
        }
      });

      // Komisyonları ödenmiş olarak işaretle
      await tx.affiliateCommission.updateMany({
        where: {
          id: { in: commissionIds }
        },
        data: {
          isPaid: true,
          paidAt: new Date(),
          payoutId: newPayout.id
        }
      });

      // Affiliate istatistiklerini güncelle
      await tx.affiliatePartner.update({
        where: { id: affiliateId },
        data: {
          pendingEarnings: { decrement: totalAmount },
          paidEarnings: { increment: totalAmount }
        }
      });

      return newPayout;
    });

    res.status(201).json({
      success: true,
      message: 'Ödeme talebi oluşturuldu',
      data: payout
    });
  } catch (error) {
    next(error);
  }
};

// Ödemeyi tamamla/iptal et (Admin)
exports.updatePayoutStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, transactionId } = req.body;

    const payout = await prisma.affiliatePayout.update({
      where: { id },
      data: {
        status,
        transactionId,
        processedBy: req.user.id,
        processedAt: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Ödeme durumu güncellendi',
      data: payout
    });
  } catch (error) {
    next(error);
  }
};

// Tüm ödemeleri listele (Admin)
exports.getAllPayouts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (status) {
      where.status = status;
    }

    const [payouts, total] = await Promise.all([
      prisma.affiliatePayout.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          affiliate: {
            include: {
              user: {
                select: {
                  fullName: true,
                  email: true
                }
              }
            }
          }
        }
      }),
      prisma.affiliatePayout.count({ where })
    ]);

    res.json({
      success: true,
      data: payouts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Affiliate istatistikleri (Admin - genel bakış)
exports.getAffiliateStats = async (req, res, next) => {
  try {
    const [
      totalAffiliates,
      activeAffiliates,
      pendingAffiliates,
      totalReferrals,
      totalCommissions,
      unpaidCommissions,
      totalEarnings
    ] = await Promise.all([
      prisma.affiliatePartner.count(),
      prisma.affiliatePartner.count({ where: { status: 'ACTIVE' } }),
      prisma.affiliatePartner.count({ where: { status: 'PENDING' } }),
      prisma.referral.count(),
      prisma.affiliateCommission.count(),
      prisma.affiliateCommission.count({ where: { isPaid: false } }),
      prisma.affiliateCommission.aggregate({
        _sum: { amount: true }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalAffiliates,
        activeAffiliates,
        pendingAffiliates,
        totalReferrals,
        totalCommissions,
        unpaidCommissions,
        totalEarnings: totalEarnings._sum.amount || 0
      }
    });
  } catch (error) {
    next(error);
  }
};
