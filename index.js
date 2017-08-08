"use strict";

const CONVERSATION_RATE_LIFT_PER_SECOND = .02;
const ENGAGEMENT_RATE_LIFT_PER_SECOND = .05;

let currentLoadTime = NaN;
let expectedLoadTime = NaN;
let currentConversionRate = NaN;
let averageOrderSize = NaN;
let usersPerMonth = NaN;

document.getElementById('current-load-time').addEventListener('change', (e)=>{
    currentLoadTime = parseInt(e.target.value, 10);
    expectedLoadTime = currentLoadTime - 1;
    render();
}
);

document.getElementById('expected-load-time').addEventListener('change', (e)=>{
    expectedLoadTime = parseInt(e.target.value, 10);
    render();
}
);

render();

document.getElementById('current-conversion-rate').addEventListener('change', (e)=>{
    currentConversionRate = parseInt(e.target.value, 10) / 100;
    render();
}
);

document.getElementById('average-order-size').addEventListener('change', (e)=>{
    averageOrderSize = parseInt(e.target.value, 10);
    render();
}
);

document.getElementById('users-per-month').addEventListener('change', (e)=>{
    usersPerMonth = parseInt(e.target.value, 10) * 1000;
    render();
}
);

function render() {
    const delta = (currentLoadTime - expectedLoadTime);
    if (delta !== delta) {
        return;
    }
    const conversationRateIncrease = delta * CONVERSATION_RATE_LIFT_PER_SECOND;

    document.getElementById('conversion-lift-number').textContent = conversationRateIncrease * 100 + '%';
    document.getElementById('engagement-lift-number').textContent = delta * ENGAGEMENT_RATE_LIFT_PER_SECOND * 100 + '%';

    const revenueIncrease = conversationRateIncrease * currentConversionRate * averageOrderSize * usersPerMonth;
    if (revenueIncrease !== revenueIncrease) {
        return;
    }
    document.getElementById('revenue-lift-number').textContent = `$${Math.round(revenueIncrease/1000)}k / month`;
}
