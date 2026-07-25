module.exports = async (req, res) => {

    if (req.method !== "POST") {

        return res.status(405).json({

            error: "Method not allowed"

        });

    }

    return res.status(200).json({

        success: true,

        message: "Checkout API working",

        stripeConfigured: !!process.env.STRIPE_SECRET_KEY

    });

};
