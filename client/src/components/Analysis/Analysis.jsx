import React, { useEffect, useState } from "react";
import SideMenu from "../Profile/SideMenu";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import './Analysis.css';

const Analysis = () => {
    const { userData } = useAuth();
    const [rawStats, setRawStats] = useState([]);
    const [totalNetWorth, setTotalNetWorth] = useState(0);

    const ALL_CATEGORIES = ["fashion", "home", "beauty", "electronics", "sports"];
    const THEME_COLORS = {
        "fashion": "#A3D9A5",
        "home": "#E9E4A6",
        "beauty": "#9BCFDC",
        "electronics": "#B19CD9",
        "sports": "#D9A3BD"
    };

    useEffect(() => {
        const fetchStats = async () => {
            if (!userData?._id) return;
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/analysis/seller/${userData._id}`);
                setRawStats(res.data);
                const total = res.data.reduce((acc, curr) => acc + curr.totalProfit, 0);
                setTotalNetWorth(total);
            } catch (err) {
                console.error("Error fetching analysis", err);
            }
        };
        fetchStats();
    }, [userData]);

    const prepareChartData = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const last4Months = [];
        for (let i = 3; i >= 0; i--) {
            const d = new Date();
            d.setDate(1);
            d.setMonth(d.getMonth() - i);
            last4Months.push(monthNames[d.getMonth()]);
        }

        return last4Months.map(m => {
            const entry = { month: m };
            ALL_CATEGORIES.forEach(cat => entry[cat] = 0);

            rawStats.filter(s => s._id.month === m).forEach(s => {
                const catKey = s._id.category.toLowerCase();
                if (ALL_CATEGORIES.includes(catKey)) {
                    entry[catKey] = s.totalSold;
                }
            });
            return entry;
        });
    };

    const prepareCategoryTotals = () => {
        const totals = {};
        ALL_CATEGORIES.forEach(cat => {
            totals[cat] = { name: cat, sold: 0, profit: 0 };
        });

        rawStats.forEach(item => {
            const catKey = item._id.category.toLowerCase();
            if (totals[catKey]) {
                totals[catKey].sold += item.totalSold;
                totals[catKey].profit += item.totalProfit;
            }
        });
        return Object.values(totals);
    };

    const chartData = prepareChartData();
    const categoryTotals = prepareCategoryTotals();

    return (
        <div className="profile-container d-flex">
            <SideMenu />
            <div className="profile-content analysis-content-wrapper">
                <div className="analysis-main-content">
                    <div className="analysis-header">
                        <div>
                            <h2 className="analysis-title">Sales Report</h2>
                            <p className="analysis-subtitle">Overview of your shop performance</p>
                        </div>
                        <div className="earnings-badge">
                            <span className="earnings-label">TOTAL NET PROFIT</span>
                            <h2 className="earnings-value">${totalNetWorth.toFixed(2)}</h2>
                        </div>
                    </div>

                    <div className="analysis-card chart-section">
                        <h5 className="card-inner-title">Sales Chart</h5>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 0" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 13 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: '#f8f9fa' }} />
                                    {ALL_CATEGORIES.map(cat => (
                                        <Bar key={cat} dataKey={cat} fill={THEME_COLORS[cat]} radius={[4, 4, 0, 0]} barSize={20} />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div><p className="analysis-subtitle">The earnings from each category</p></div>
                    <div className="row g-4 mt-2">
                        {categoryTotals.map((cat, idx) => {
                            // Logic: (Category Profit / Total Profit) * 100
                            const percentage = totalNetWorth > 0
                                ? Math.max(0, Math.round((cat.profit / totalNetWorth) * 100))
                                : 0;

                            return (
                                <div className="col-lg-4 col-md-6" key={idx}>
                                    <div className="analysis-card donut-card">
                                        <div className="donut-text">
                                            <h6 className="category-name text-capitalize">{cat.name}</h6>
                                            <p className="category-desc">
                                                {percentage > 0 ? `Earnings: $${cat.profit.toFixed(0)}` : "No sales data."}
                                            </p>
                                        </div>
                                        <div className="donut-visual">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={[{ value: percentage || 0.1 }, { value: 100 - (percentage || 0.1) }]}
                                                        innerRadius="70%"
                                                        outerRadius="100%"
                                                        dataKey="value"
                                                        startAngle={90}
                                                        endAngle={450}
                                                        stroke="none"
                                                    >
                                                        <Cell fill={percentage > 0 ? THEME_COLORS[cat.name] : "#E0E0E0"} />
                                                        <Cell fill="#EEEEEE" />
                                                    </Pie>
                                                </PieChart>
                                            </ResponsiveContainer>
                                            <span className="donut-percentage">{percentage}%</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analysis;