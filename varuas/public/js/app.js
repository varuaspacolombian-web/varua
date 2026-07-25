let services = [];

const serviceSelect = document.getElementById("service");
const summaryName = document.getElementById("summary-name");
const summaryDescription = document.getElementById("summary-description");
const summaryDuration = document.getElementById("summary-duration");
const summaryPrice = document.getElementById("summary-price");
const customPayment = document.getElementById("custom-payment");
const customDescription = document.getElementById("custom-description");
const customAmount = document.getElementById("custom-amount");
const checkoutButton = document.getElementById("checkout-button");

async function loadServices() {

    try {

        const response = await fetch("/api/services");

        services = await response.json();

        renderServices();

    } catch (error) {

        console.error("Error loading services:", error);

    }

}

function renderServices() {

    serviceSelect.innerHTML = "";

    services.forEach(service => {

        const option = document.createElement("option");

        option.value = service.id;

        option.textContent = service.name;

        serviceSelect.appendChild(option);

    });

    if (services.length > 0) {

        updateSummary(services[0]);

    }

}

function updateSummary(service) {

    // Nombre

    summaryName.textContent = service.name;

    // Descripción

    summaryDescription.textContent = service.description;

    // Duración

    if (service.duration > 0) {

        summaryDuration.textContent = `${service.duration} Minutes`;

    } else {

        summaryDuration.textContent = "--";

    }

    // Mostrar u ocultar el formulario de pago personalizado

    if (service.id === "custom-payment") {

        customPayment.classList.add("show");

        summaryPrice.textContent = "$0.00 USD";

        customDescription.value = "";

        customAmount.value = "";

    } else {

        customPayment.classList.remove("show");

        summaryPrice.textContent = `$${service.price} ${service.currency}`;

    }

}

serviceSelect.addEventListener("change", () => {

    const service = services.find(item => item.id === serviceSelect.value);

    if (service) {

        updateSummary(service);

    }

});
customAmount.addEventListener("input", () => {

    const amount = parseFloat(customAmount.value);

    if (!isNaN(amount) && amount > 0) {

        summaryPrice.textContent = `$${amount.toFixed(2)} USD`;

    } else {

        summaryPrice.textContent = "$0.00 USD";

    }

});
loadServices();
checkoutButton.addEventListener("click", async () => {

    const selectedService = services.find(
        item => item.id === serviceSelect.value
    );

    if (!selectedService) {

        alert("Please select a treatment.");

        return;

    }

    let payload = {};

    // Pago personalizado

    if (selectedService.id === "custom-payment") {

        const amount = parseFloat(customAmount.value);

        if (!amount || amount <= 0) {

            alert("Please enter a valid amount.");

            return;

        }

        payload = {

            custom: true,

            description: customDescription.value || "Custom Payment",

            amount: amount

        };

    } else {

        payload = {

            serviceId: selectedService.id

        };

    }

    try {

        const response = await fetch("/api/checkout", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(payload)

        });

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.error(error);

    }

});