import { DollarSign, TrendingUp, Users, Zap } from "lucide-react";
import { StatCard } from "./ui/counter";

export function CounterDemo() {
	return (
		<div className="flex min-h-[500px] items-center justify-center p-8">
			<div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					label="Total Revenue"
					value={1234567}
					prefix="$"
					decimals={0}
					icon={<DollarSign className="h-6 w-6" />}
					color="#10b981"
					delay={0}
				/>
				<StatCard
					label="Active Users"
					value={45678}
					suffix="+"
					decimals={0}
					icon={<Users className="h-6 w-6" />}
					color="#3b82f6"
					delay={0.1}
				/>
				<StatCard
					label="Growth Rate"
					value={23.5}
					suffix="%"
					decimals={1}
					icon={<TrendingUp className="h-6 w-6" />}
					color="#f59e0b"
					delay={0.2}
				/>
				<StatCard
					label="Performance"
					value={98.7}
					suffix="%"
					decimals={1}
					icon={<Zap className="h-6 w-6" />}
					color="#8b5cf6"
					delay={0.3}
				/>
			</div>
		</div>
	);
}
