const services = require("../public/data/services.json");

export default function handler(req, res) {

    if (req.method !== "GET") {

        return res.status(405).json({
            error: "Method Not Allowed"
        });

    }

    const activeServices = services.filter(service => service.active);

    return res.status(200).json(activeServices);

}