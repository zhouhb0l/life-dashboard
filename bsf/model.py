from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass


@dataclass
class ModelConfig:
    team_size: int = 11
    days_in_month: int = 30
    average_rest_days: int = 4
    monthly_rent: float = 49000.0
    monthly_electricity: float = 11000.0
    average_salary: float = 6300.0

    @property
    def fixed_cost(self) -> float:
        return self.monthly_rent + self.monthly_electricity

    @property
    def average_workdays(self) -> float:
        return self.days_in_month - self.average_rest_days

    @property
    def average_daily_wage(self) -> float:
        return self.average_salary / self.average_workdays


def attendance_equivalent(half_day_staff: float, full_day_staff: float) -> float:
    return half_day_staff * 0.5 + full_day_staff


def people_efficiency(revenue: float, on_duty_equivalent: float) -> float:
    if on_duty_equivalent <= 0:
        raise ValueError("上班人数之和必须大于 0。")
    return revenue / on_duty_equivalent


def gross_margin(revenue: float, material_cost: float) -> tuple[float, float]:
    if revenue <= 0:
        raise ValueError("营业额必须大于 0。")
    gross_profit = revenue - material_cost
    margin = gross_profit / revenue
    return gross_profit, margin


def labor_cost_from_efficiency(
    revenue: float,
    people_eff: float,
    average_daily_wage: float,
) -> tuple[float, float]:
    if people_eff <= 0:
        raise ValueError("人效必须大于 0。")
    on_duty_equivalent = revenue / people_eff
    labor_cost = on_duty_equivalent * average_daily_wage
    return on_duty_equivalent, labor_cost


def profit_status(
    revenue: float,
    gross_margin_rate: float,
    people_eff: float,
    electricity: float,
    rent: float,
    average_daily_wage: float,
) -> dict[str, float | str]:
    on_duty_equivalent, labor_cost = labor_cost_from_efficiency(
        revenue=revenue,
        people_eff=people_eff,
        average_daily_wage=average_daily_wage,
    )
    gross_profit = revenue * gross_margin_rate
    profit = gross_profit - labor_cost - electricity - rent
    return {
        "营业额": revenue,
        "毛利额": gross_profit,
        "人效": people_eff,
        "折算出勤人数": on_duty_equivalent,
        "人工成本": labor_cost,
        "电费": electricity,
        "房租": rent,
        "利润": profit,
        "盈利状态": "赚钱" if profit > 0 else "保本" if abs(profit) < 1e-6 else "亏损",
    }


def break_even_revenue(
    gross_margin_rate: float,
    people_eff: float,
    fixed_cost: float,
    average_daily_wage: float,
) -> float:
    if people_eff <= 0:
        raise ValueError("人效必须大于 0。")
    contribution_rate = gross_margin_rate - average_daily_wage / people_eff
    if contribution_rate <= 0:
        raise ValueError("当前毛利率和人效组合下无法保本，请提高毛利率或人效。")
    return fixed_cost / contribution_rate


def required_gross_margin(
    revenue: float,
    people_eff: float,
    fixed_cost: float,
    average_daily_wage: float,
) -> float:
    if revenue <= 0:
        raise ValueError("营业额必须大于 0。")
    if people_eff <= 0:
        raise ValueError("人效必须大于 0。")
    return fixed_cost / revenue + average_daily_wage / people_eff


def weekly_revenue_range() -> tuple[float, float]:
    low = 4 * 5000 + 7500 + 2 * 12000
    high = 4 * 6000 + 9500 + 2 * 16000
    return low, high


def monthly_revenue_range(weeks_per_month: float = 4.345) -> tuple[float, float]:
    low, high = weekly_revenue_range()
    return low * weeks_per_month, high * weeks_per_month


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="门店盈利数学模型")
    subparsers = parser.add_subparsers(dest="command", required=True)

    p1 = subparsers.add_parser("renxiao", help="根据营业额和出勤计算人效")
    p1.add_argument("--revenue", type=float, required=True, help="营业额")
    p1.add_argument("--half-day-staff", type=float, default=0.0, help="4-6 小时人数")
    p1.add_argument("--full-day-staff", type=float, default=0.0, help="8-12 小时人数")

    p2 = subparsers.add_parser("maoli", help="根据营业额和原料成本计算毛利")
    p2.add_argument("--revenue", type=float, required=True, help="营业额")
    p2.add_argument("--cost", type=float, required=True, help="原料成本")

    p3 = subparsers.add_parser("profit", help="根据营业额、人效、毛利率计算盈利")
    p3.add_argument("--revenue", type=float, required=True, help="营业额")
    p3.add_argument("--people-eff", type=float, required=True, help="人效")
    p3.add_argument("--gross-margin-rate", type=float, required=True, help="毛利率，例如 0.68")
    p3.add_argument("--electricity", type=float, default=11000.0, help="电费")
    p3.add_argument("--rent", type=float, default=49000.0, help="房租")
    p3.add_argument("--avg-salary", type=float, default=6300.0, help="人均月工资")
    p3.add_argument("--rest-days", type=int, default=4, help="人均月休")
    p3.add_argument("--days-in-month", type=int, default=30, help="当月天数")

    p4 = subparsers.add_parser("breakeven", help="计算保本营业额和保本毛利率")
    p4.add_argument("--people-eff", type=float, required=True, help="人效")
    p4.add_argument("--gross-margin-rate", type=float, required=True, help="毛利率，例如 0.68")
    p4.add_argument("--fixed-cost", type=float, default=60000.0, help="固定成本")
    p4.add_argument("--avg-salary", type=float, default=6300.0, help="人均月工资")
    p4.add_argument("--rest-days", type=int, default=4, help="人均月休")
    p4.add_argument("--days-in-month", type=int, default=30, help="当月天数")
    p4.add_argument("--revenue", type=float, help="若提供营业额，则额外计算保本毛利率")

    p5 = subparsers.add_parser("forecast", help="根据周营业额区间估算月营业额")

    return parser


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    parser = build_parser()
    args = parser.parse_args()

    if args.command == "renxiao":
        on_duty = attendance_equivalent(args.half_day_staff, args.full_day_staff)
        result = people_efficiency(args.revenue, on_duty)
        print(f"折算出勤人数: {on_duty:.2f}")
        print(f"人效: {result:.2f}")
        return

    if args.command == "maoli":
        gross_profit, margin = gross_margin(args.revenue, args.cost)
        print(f"毛利额: {gross_profit:.2f}")
        print(f"毛利率: {margin:.2%}")
        return

    if args.command in {"profit", "breakeven"}:
        config = ModelConfig(
            average_salary=args.avg_salary,
            average_rest_days=args.rest_days,
            days_in_month=args.days_in_month,
        )

    if args.command == "profit":
        result = profit_status(
            revenue=args.revenue,
            gross_margin_rate=args.gross_margin_rate,
            people_eff=args.people_eff,
            electricity=args.electricity,
            rent=args.rent,
            average_daily_wage=config.average_daily_wage,
        )
        for key, value in result.items():
            if isinstance(value, str):
                print(f"{key}: {value}")
            elif "率" in key:
                print(f"{key}: {value:.2%}")
            else:
                print(f"{key}: {value:.2f}")
        return

    if args.command == "breakeven":
        revenue_needed = break_even_revenue(
            gross_margin_rate=args.gross_margin_rate,
            people_eff=args.people_eff,
            fixed_cost=args.fixed_cost,
            average_daily_wage=config.average_daily_wage,
        )
        print(f"保本营业额: {revenue_needed:.2f}")
        if args.revenue:
            margin_needed = required_gross_margin(
                revenue=args.revenue,
                people_eff=args.people_eff,
                fixed_cost=args.fixed_cost,
                average_daily_wage=config.average_daily_wage,
            )
            print(f"该营业额下保本毛利率: {margin_needed:.2%}")
        return

    if args.command == "forecast":
        weekly_low, weekly_high = weekly_revenue_range()
        monthly_low, monthly_high = monthly_revenue_range()
        print(f"周营业额区间: {weekly_low:.2f} ~ {weekly_high:.2f}")
        print(f"月营业额区间: {monthly_low:.2f} ~ {monthly_high:.2f}")
        return


if __name__ == "__main__":
    main()
