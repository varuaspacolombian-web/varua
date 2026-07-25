let services = [];

const serviceSelect = document.getElementById("service");
const summaryName = document.getElementById("summary-name");
const summaryDescription = document.getElementById("summary-description");
const summaryDuration = document.getElementById("summary-duration");
const summaryPrice = document.getElementById("summary-price");
const customPayment = document.getElementById("custom-payment");
const customDescription = document.getElementById("custom-description");
const customAmount = document.getElementById("custom-amount");
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

    if (service.duration && service.duration > 0) {

        summaryDuration.textContent = `${service.duration} Minutes`;

    } else {

        summaryDuration.textContent = "--";

    }

    // Custom Payment

    if (service.custom) {

        customPayment.classList.remove("hidden");

        summaryPrice.textContent = "$0.00 USD";

        customDescription.value = "";

        customAmount.value = "";

    } else {

        customPayment.classList.add("hidden");

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
