let services = [];

const serviceSelect = document.getElementById("service");

const summaryName = document.getElementById("summary-name");
const summaryDescription = document.getElementById("summary-description");
const summaryDuration = document.getElementById("summary-duration");
const summaryPrice = document.getElementById("summary-price");

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

    summaryName.textContent = service.name;

    summaryDescription.textContent = service.description;

    summaryDuration.textContent = `${service.duration} Minutes`;

    summaryPrice.textContent = `$${service.price} ${service.currency}`;

}

serviceSelect.addEventListener("change", () => {

    const service = services.find(item => item.id === serviceSelect.value);

    if (service) {

        updateSummary(service);

    }

});

loadServices();