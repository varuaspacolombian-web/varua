const Stripe = require("stripe");

module.exports = async (req, res) => {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });

    }

    try {

        return res.status(200).json({

            ok: true,

            env: !!process.env.STRIPE_SECRET_KEY,

            message: "Checkout API working"

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            error: error.message

        });

    }

};
