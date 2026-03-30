import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

type SortKey = "name" | "role" | "status" | "score" | "joined";
type SortDir = "asc" | "desc";
type Status = "Active" | "Away" | "Offline";

type Member = {
	id: string;
	name: string;
	initials: string;
	avatarColor: string;
	role: string;
	status: Status;
	score: number;
	joined: string;
	joinedTs: number;
};

const MEMBERS: Member[] = [
	{
		id: "1",
		name: "Aria Chen",
		initials: "AC",
		avatarColor: "bg-violet-500/20 text-violet-400",
		role: "Product Designer",
		status: "Active",
		score: 94,
		joined: "Jan 2022",
		joinedTs: 1641024000,
	},
	{
		id: "2",
		name: "Marcus Webb",
		initials: "MW",
		avatarColor: "bg-blue-500/20 text-blue-400",
		role: "Frontend Engineer",
		status: "Active",
		score: 88,
		joined: "Mar 2022",
		joinedTs: 1646179200,
	},
	{
		id: "3",
		name: "Priya Nair",
		initials: "PN",
		avatarColor: "bg-emerald-500/20 text-emerald-400",
		role: "Data Analyst",
		status: "Away",
		score: 76,
		joined: "Jul 2022",
		joinedTs: 1656633600,
	},
	{
		id: "4",
		name: "Jonas Becker",
		initials: "JB",
		avatarColor: "bg-amber-500/20 text-amber-400",
		role: "Backend Engineer",
		status: "Active",
		score: 91,
		joined: "Sep 2021",
		joinedTs: 1630454400,
	},
	{
		id: "5",
		name: "Leila Moradi",
		initials: "LM",
		avatarColor: "bg-rose-500/20 text-rose-400",
		role: "DevOps Engineer",
		status: "Offline",
		score: 62,
		joined: "Feb 2023",
		joinedTs: 1675209600,
	},
	{
		id: "6",
		name: "Sam Torres",
		initials: "ST",
		avatarColor: "bg-cyan-500/20 text-cyan-400",
		role: "UX Researcher",
		status: "Active",
		score: 83,
		joined: "Nov 2022",
		joinedTs: 1667260800,
	},
	{
		id: "7",
		name: "Yuna Park",
		initials: "YP",
		avatarColor: "bg-pink-500/20 text-pink-400",
		role: "Product Manager",
		status: "Away",
		score: 79,
		joined: "May 2023",
		joinedTs: 1682899200,
	},
	{
		id: "8",
		name: "Theo Müller",
		initials: "TM",
		avatarColor: "bg-indigo-500/20 text-indigo-400",
		role: "iOS Developer",
		status: "Offline",
		score: 57,
		joined: "Aug 2023",
		joinedTs: 1690848000,
	},
];

const STATUS_STYLES: Record<Status, string> = {
	Active: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25",
	Away: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25",
	Offline: "bg-default-500/10 text-default-500 ring-1 ring-default-500/20",
};

const STATUS_DOT: Record<Status, string> = {
	Active: "bg-emerald-400",
	Away: "bg-amber-400",
	Offline: "bg-default-500",
};

const SCORE_TRACK_BG = "bg-default-200/60";
const SCORE_BAR_COLOR = (score: number) => {
	if (score >= 85) return "bg-emerald-500";
	if (score >= 70) return "bg-blue-500";
	if (score >= 55) return "bg-amber-500";
	return "bg-rose-500";
};

type Column = {
	key: SortKey;
	label: string;
	width: string;
};

const COLUMNS: Column[] = [
	{ key: "name", label: "Name", width: "w-[22%]" },
	{ key: "role", label: "Role", width: "w-[22%]" },
	{ key: "status", label: "Status", width: "w-[14%]" },
	{ key: "score", label: "Score", width: "w-[24%]" },
	{ key: "joined", label: "Joined", width: "w-[18%]" },
];

function sortMembers(members: Member[], key: SortKey, dir: SortDir): Member[] {
	return [...members].sort((a, b) => {
		let cmp = 0;
		if (key === "name") cmp = a.name.localeCompare(b.name);
		else if (key === "role") cmp = a.role.localeCompare(b.role);
		else if (key === "status") cmp = a.status.localeCompare(b.status);
		else if (key === "score") cmp = a.score - b.score;
		else if (key === "joined") cmp = a.joinedTs - b.joinedTs;
		return dir === "asc" ? cmp : -cmp;
	});
}

export function SortableTableDemo() {
	const [sortKey, setSortKey] = useState<SortKey>("score");
	const [sortDir, setSortDir] = useState<SortDir>("desc");
	const [query, setQuery] = useState("");

	const handleSort = (key: SortKey) => {
		if (key === sortKey) {
			setSortDir((d) => (d === "asc" ? "desc" : "asc"));
		} else {
			setSortKey(key);
			setSortDir("asc");
		}
	};

	const rows = useMemo(() => {
		const q = query.toLowerCase().trim();
		const filtered = q
			? MEMBERS.filter(
					(m) =>
						m.name.toLowerCase().includes(q) ||
						m.role.toLowerCase().includes(q) ||
						m.status.toLowerCase().includes(q),
				)
			: MEMBERS;
		return sortMembers(filtered, sortKey, sortDir);
	}, [sortKey, sortDir, query]);

	return (
		<div className="min-h-[500px] p-8">
			<div className="mx-auto max-w-4xl">
				{/* Search bar */}
				<div className="relative mb-6 max-w-sm">
					<Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 text-default-400" />
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search by name, role or status…"
						className="w-full rounded-xl border border-default-200 bg-default-100 py-2.5 pr-4 pl-10 text-default-900 text-sm outline-none transition-colors placeholder:text-default-400 focus:border-primary focus:bg-default-200"
					/>
				</div>

				{/* Table card */}
				<div className="overflow-hidden rounded-2xl border border-default-200 bg-default-50/50 backdrop-blur-sm">
					{/* Header */}
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-default-200 border-b bg-default-100/60">
								{COLUMNS.map((col) => {
									const isActive = sortKey === col.key;
									return (
										<th
											key={col.key}
											className={`${col.width} px-4 py-3 text-left`}
										>
											<button
												type="button"
												onClick={() => handleSort(col.key)}
												className="group inline-flex items-center gap-1.5 font-semibold text-default-600 text-xs uppercase tracking-wider transition-colors hover:text-default-900"
											>
												{col.label}
												<motion.span
													animate={
														isActive
															? {
																	rotate: sortDir === "desc" ? 180 : 0,
																	color: "var(--color-primary, #6366f1)",
																}
															: { rotate: 0, color: "currentColor" }
													}
													transition={{
														type: "spring",
														stiffness: 400,
														damping: 28,
													}}
													className="inline-flex opacity-60 group-hover:opacity-100"
												>
													<ArrowUpDown className="h-3.5 w-3.5" />
												</motion.span>
											</button>
										</th>
									);
								})}
							</tr>
						</thead>
					</table>

					{/* Body — AnimatePresence lives outside thead so layout changes animate */}
					<div className="relative">
						<table className="w-full border-collapse">
							<tbody>
								<AnimatePresence mode="popLayout" initial={false}>
									{rows.length === 0 ? (
										<motion.tr
											key="empty"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											<td
												colSpan={5}
												className="py-16 text-center text-default-400 text-sm"
											>
												No team members match your search.
											</td>
										</motion.tr>
									) : (
										rows.map((member) => (
											<motion.tr
												key={member.id}
												layoutId={member.id}
												layout="position"
												initial={{ opacity: 0, y: -6 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, scale: 0.97 }}
												transition={{
													layout: {
														type: "spring",
														stiffness: 340,
														damping: 34,
													},
													opacity: { duration: 0.18 },
													scale: { duration: 0.18 },
												}}
												className="group cursor-default border-default-200/60 border-b last:border-b-0"
												whileHover={{
													backgroundColor: "rgba(99,102,241,0.04)",
												}}
											>
												{/* Name */}
												<td className="w-[22%] px-4 py-3.5">
													<div className="flex items-center gap-3">
														<div
															className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-semibold text-xs ${member.avatarColor}`}
														>
															{member.initials}
														</div>
														<span className="font-medium text-default-900 text-sm leading-none">
															{member.name}
														</span>
													</div>
												</td>

												{/* Role */}
												<td className="w-[22%] px-4 py-3.5 text-default-600 text-sm">
													{member.role}
												</td>

												{/* Status badge */}
												<td className="w-[14%] px-4 py-3.5">
													<span
														className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs ${STATUS_STYLES[member.status]}`}
													>
														<span
															className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${STATUS_DOT[member.status]}`}
														/>
														{member.status}
													</span>
												</td>

												{/* Score with mini progress bar */}
												<td className="w-[24%] px-4 py-3.5">
													<div className="flex items-center gap-3">
														<div
															className={`h-1.5 flex-1 overflow-hidden rounded-full ${SCORE_TRACK_BG}`}
														>
															<motion.div
																className={`h-full rounded-full ${SCORE_BAR_COLOR(member.score)}`}
																initial={{ width: 0 }}
																animate={{ width: `${member.score}%` }}
																transition={{
																	type: "spring",
																	stiffness: 180,
																	damping: 24,
																	delay: 0.05,
																}}
															/>
														</div>
														<span className="w-7 flex-shrink-0 text-right font-mono font-semibold text-default-700 text-sm tabular-nums">
															{member.score}
														</span>
													</div>
												</td>

												{/* Joined */}
												<td className="w-[18%] px-4 py-3.5 text-default-500 text-sm">
													{member.joined}
												</td>
											</motion.tr>
										))
									)}
								</AnimatePresence>
							</tbody>
						</table>
					</div>

					{/* Footer count */}
					<div className="border-default-200/60 border-t px-4 py-2.5">
						<p className="text-default-400 text-xs">
							{rows.length} of {MEMBERS.length} members
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
