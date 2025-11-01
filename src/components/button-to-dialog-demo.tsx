import { useState } from "react";
import { ButtonToDialog } from "./ui/button-to-dialog";

export function ButtonToDialogDemo() {
	const [isOpen, setIsOpen] = useState(false);

	const handleConfirm = () => {
		console.log("Account deleted!");
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
						layoutId="delete-button"
						title="Delete Account"
						description="This action cannot be undone. All your data will be permanently removed from our servers."
						confirmText="Delete"
						cancelText="Cancel"
					/>
				</div>
			</div>
		</div>
	);
}
