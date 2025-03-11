const apiUrl = "https://backend-stripe-sales-tracker-8iz6.onrender.com/sales"; // Your Render API URL

document.addEventListener("DOMContentLoaded", async () => {
    const ctx = document.getElementById("salesChart").getContext("2d");

    let salesData = [];
    let salesLabels = [];

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.data || !Array.isArray(data.data)) {
            console.error("Unexpected API response format:", data);
            return;
        }

        let totalRevenue = 0;

        // Process sales data
        data.data.forEach((transaction, index) => {
            let amount = transaction.amount / 100; // Convert cents to dollars
            totalRevenue += amount;

            salesData.push(totalRevenue);
            salesLabels.push(`Sale ${index + 1}`);
        });

        // Create Small Chart with Black Line & Visible Labels
        new Chart(ctx, {
            type: "line",
            data: {
                labels: salesLabels,
                datasets: [{
                    label: "Sales Progress ($)",
                    data: salesData,
                    borderColor: "#000000", // 🖤 Black Line
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Light gray fill
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: false, // Prevent auto-resizing
                maintainAspectRatio: true, // Keep proportions
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 4500,
                        grid: {
                            color: "rgba(0, 0, 0, 0.2)" // Light gray grid lines for contrast
                        },
                        ticks: {
                            color: "#000000", // 🖤 Black text for Y-axis labels
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: "rgba(0, 0, 0, 0.2)" // Light gray grid lines for contrast
                        },
                        ticks: {
                            color: "#000000", // 🖤 Black text for X-axis labels
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Hide legend for a cleaner look
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error fetching sales data:", error);
    }
});
