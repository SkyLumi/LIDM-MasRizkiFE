type DeletePlayerModalProps = {
	open: boolean;
	onClose: () => void;
	onConfirm?: () => void;
};

export default function DeletePlayerModal({ open, onClose, onConfirm }: DeletePlayerModalProps) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[102] opacity-100 transition-opacity duration-200 ease-in-out">
			<div className="relative w-[90%] max-w-[400px] bg-white rounded-2xl border border-[#0066FF] shadow-[8px_8px_0_0_#084EC5] flex flex-col gap-4 p-6 opacity-100 transform scale-100 translate-y-0 transition-[opacity,transform] duration-200">
				<h3 className="font-['Raleway'] font-bold text-[18px] text-[#262626] m-0 text-center">Apakah Kamu Yakin?</h3>
				<p className="font-['Raleway'] font-normal text-[14px] text-[#595959] m-0 text-center leading-[1.5]">Tindakan ini tidak dapat dibatalkan. Pemain akan dihapus secara permanen.</p>
				<div className="flex gap-3 mt-6">
					<button onClick={onClose} className="flex-1 p-4 rounded-lg border border-[#262626] font-['Raleway'] font-bold text-[14px] leading-4 cursor-pointer transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-white text-[#262626] scale-100 opacity-100 active:scale-95">Batal</button>
					<button onClick={onConfirm} className="flex-1 p-4 rounded-lg border-0 font-['Raleway'] font-bold text-[14px] leading-4 cursor-pointer transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-[#0066FF] text-white scale-100 opacity-100">Hapus</button>
				</div>
			</div>
		</div>
	);
}


