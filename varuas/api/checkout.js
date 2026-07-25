const Stripe = require("stripe");
const services = require("../public/data/services.json");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });

    }

    try {

        const body = req.body;

        let name;
        let description;
        let amount;

        // ===========================
        // CUSTOM PAYMENT
        // ===========================

        if (body.custom) {

            name = body.description || "Custom Payment";

            description = body.description || "Custom Payment";

            amount = Math.round(Number(body.amount) * 100);

        }

        // ===========================
        // SERVICE
        // ===========================

        else {

            const service = services.find(
                item => item.id === body.serviceId
            );

            if (!service) {

                return res.status(404).json({
                    error: "Service not found"
                });

            }

            name = service.name;

            description = service.description;

            amount = Math.round(service.price * 100);

        }

        // ===========================
        // STRIPE CHECKOUT
        // ===========================

        const session = await stripe.checkout.sessions.create({
  mode: "payment",

  automatic_payment_methods: {
    enabled: true,
  },

  line_items: [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name,
          description,
        },
        unit_amount: amount,
      },
      quantity: 1,
    },
  ],

  success_url: "https://varua.vercel.app/success.html",
  cancel_url: "https://varua.vercel.app/cancel.html",
});
        return res.status(200).json({

            url: session.url

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            error: error.message

        });

    }

};