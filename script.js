const apiUrl = "https://backend-stripe-sales-tracker-8iz6.onrender.com/sales"; // Your Render API URL

document.addEventListener("DOMContentLoaded", async () => {
    const ctx = document.getElementById("salesChart").getContext("2d");

    let salesData = [];
    let salesLabels = [];
    let totalRevenue = 0; // Track total donations received

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("API Response:", data); // Debugging API response

        // ✅ Handle unexpected API response format
        if (!data || !data.data || !Array.isArray(data.data)) {
            console.error("Invalid API response:", data);
            return;
        }

        // ✅ Process each donation transaction
        data.data.forEach((transaction, index) => {
            let amountInDollars = transaction.amount / 100; // Convert cents to dollars
            totalRevenue += amountInDollars; // Add to total donations

            salesData.push(totalRevenue); // Track cumulative donation progress
            salesLabels.push(`Donation ${index + 1}`); // Label donations in order
        });

        // ✅ Display total donation amount in the console (For Debugging)
        console.log("Total Donations Received:", totalRevenue);

        // ✅ Render Donation Progress Chart
        new Chart(ctx, {
            type: "line",
            data: {
                labels: salesLabels,
                datasets: [{
                    label: "Donation Progress ($)",
                    data: salesData,
                    borderColor: "#000000", // Black line
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Light black fill
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 4500, // Keep the $4500 goal visible
                        grid: {
                            color: "rgba(0, 0, 0, 0.2)"
                        },
                        ticks: {
                            color: "#000000"
                        }
                    },
                    x: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.2)"
                        },
                        ticks: {
                            color: "#000000"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error fetching sales data:", error);
    }
});
