require("dotenv").config();

const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });

    }

    try {

        res.status(200).json({

            message: "Stripe connection successful."

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: error.message

        });

    }

};