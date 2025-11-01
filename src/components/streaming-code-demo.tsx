import { useState } from "react";
import { StreamingCode } from "./ui/streaming-code";

const sampleCode = `import { useState, useEffect } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);
  
  return (
    <div className="flex flex-col gap-4">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`;

/**
 * Demo component showcasing the StreamingCode component
 */
export function StreamingCodeDemo() {
	const [key, setKey] = useState(0);
	const [isComplete, setIsComplete] = useState(false);

	const handleReplay = () => {
		setKey((prev) => prev + 1);
		setIsComplete(false);
	};

	return (
		<div className="flex items-center justify-center p-8">
			<div className="w-full max-w-2xl">
				<div className="mb-6 text-center">
					<h2 className="mb-2 font-bold text-2xl">Streaming Code Demo</h2>
					<p className="text-default-500 text-sm">
						Watch as code types out line by line with a cursor animation
					</p>
				</div>

				<StreamingCode
					key={key}
					code={sampleCode}
					language="tsx"
					speed={30}
					showLineNumbers={true}
					onComplete={() => setIsComplete(true)}
					className="mb-4"
				/>

				<div className="flex justify-center gap-3">
					<button
						type="button"
						onClick={handleReplay}
						className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-600"
					>
						Replay Animation
					</button>
					{isComplete && (
						<span className="flex items-center gap-2 text-green-500 text-sm">
							<svg
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							Complete
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
