import { useState } from "react";
import { ButtonToDialog } from "./ui/button-to-dialog";

export function ButtonToDialogDemo() {
	const [isOpen, setIsOpen] = useState(false);

	const handleConfirm = () => {
		console.log("Confirmed!");
		setIsOpen(false);
	};

	return (
		<div className="flex min-h-[400px] w-full items-center justify-center px-4">
			<div className="w-full max-w-md">
				<div onClick={() => !isOpen && setIsOpen(true)}>
					<ButtonToDialog
						isOpen={isOpen}
						onClose={() => setIsOpen(false)}
						onConfirm={handleConfirm}
						layoutId="receive-button"
						title="Confirm"
						description="Are you sure you want to receive a load of money?"
						confirmText="Receive"
						cancelText="Cancel"
					/>
				</div>
			</div>
		</div>
	);
}
