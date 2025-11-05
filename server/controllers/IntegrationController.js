// 📁 controllers/integrationController.js
const Donor = require("../models/DonorModel");
const Avrech = require("../models/AvrechimModel");
const Expense = require("../models/ExpensesModel");

exports.getFinancialIntegration = async (req, res) => {
    try {
        // 🔹 שלב 1: שליפת כל התרומות (הכנסות)
        const donors = await Donor.aggregate([
            { $unwind: "$donations" }, // מפרק את המערך donations
            {
                $project: {
                    _id: 0,
                    name: { $concat: ["תרומה מ", "$name"] },
                    type: "income",
                    source: "donation",
                    date: "$donations.date",
                    amount: "$donations.amount",
                    details: {
                        paymentMethod: "$donations.paymentMethod",
                        frequency: "$donations.frequency"
                    }
                }
            }
        ]);

        // 🔹 שלב 2: שליפת כל המלגות (הוצאות)
        const milgot = await Avrech.aggregate([
            { $unwind: "$recentMilgot" },
            {
                $project: {
                    _id: 0,
                    name: { $concat: ["מלגה ל", "$name"] },
                    type: "milga",
                    source: "milga",
                    date: "$recentMilgot.date",
                    amount: "$recentMilgot.milgaAmount",
                    details: "$recentMilgot.details"
                }
            }
        ]);

        // 🔹 שלב 3: שליפת הוצאות כלליות
        const expenses = await Expense.aggregate([
            {
                $project: {
                    _id: 0,
                    name: "$description",
                    type: "expense",
                    source: "expense",
                    date: "$date",
                    amount: "$amount",
                    details: "הוצאה כללית"
                }
            }
        ]);

        // 🔹 שלב 4: איחוד הכל לטבלה אחת
        const integratedData = [...donors, ...milgot, ...expenses];

        // 🔹 שלב 5: מיון לפי תאריך (מהחדש לישן)
        integratedData.sort((a, b) => new Date(b.date) - new Date(a.date));

        const totalIncome = integratedData
      .filter((i) => i.type === "income")
      .reduce((sum, i) => sum + i.amount, 0);

    const totalExpense = integratedData
      .filter((i) => i.type === "expense")
      .reduce((sum, i) => sum + i.amount, 0);

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      integratedData,
      summary: {
        totalIncome,
        totalExpense,
        balance,
      },
    });
    } catch (error) {
        console.error("❌ שגיאה באינטגרציה:", error);
        res.status(500).json({ message: "שגיאה בעת יצירת אינטגרציה" });
    }
};
