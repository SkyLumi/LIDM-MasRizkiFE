type AvatarPickerModalProps = {
	open: boolean;
	onClose: () => void;
	onSelect?: (url: string) => void;
	selected?: string;
};

const AVATARS: string[] = [
	'https://framerusercontent.com/images/29tJJZ9T663Fl2ZBRqQV3NGHEs.png?width=214&height=213',
	'https://framerusercontent.com/images/olyDklH86xdWuEfWuT5uPR1XB0.png?width=214&height=214',
	'https://framerusercontent.com/images/l8zsmgBjSw9fsNdbw02DICp8nhg.png?width=213&height=213',
	'https://framerusercontent.com/images/QL4YPq8cbQKu96Z4VlaylTBWeM.png?width=213&height=214',
	'https://framerusercontent.com/images/0rG9nVDO0N9LDybuyX5Q1ZorX6w.png?width=214&height=213',
	'https://framerusercontent.com/images/3PsGHMBhnyYLirzpKOlfnT4FFs.png?width=213&height=213',
	'https://framerusercontent.com/images/I9Ic0aj9R8klONpg9FweXVNWHts.png?width=214&height=213',
	'https://framerusercontent.com/images/pOa0LEN8qPwqmyqEeykmYFAxY.png?width=213&height=213',
	'https://framerusercontent.com/images/lk3hklcHiEZzttjAVrzUco2zg.png?width=214&height=213',
	'https://framerusercontent.com/images/xEivhKtUZTmwWD6baVlrFwqsJw.png?width=214&height=213',
	'https://framerusercontent.com/images/aipTFf6NSzsfem76NAnOGhguais.png?width=214&height=213',
	'https://framerusercontent.com/images/kNlgLqxgASEevLvFaZ7RryNlwQ.png?width=214&height=213',
	'https://framerusercontent.com/images/mPSDUoJG9E3vd899LJakLRonKg.png?width=214&height=213',
	'https://framerusercontent.com/images/QrASEGcn12DFp7aWo6awjixRU.png?width=214&height=214',
	'https://framerusercontent.com/images/zrReR3p2WddyQNuJb6zHGOtrv8M.png?width=213&height=213',
	'https://framerusercontent.com/images/Duggm1XqYkEs3NjDOlpUUM5ck.png?width=213&height=214',
];

export default function AvatarPickerModal({ open, onClose, onSelect, selected }: AvatarPickerModalProps) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[101] opacity-100 transition-opacity duration-200 ease-in-out">
			<div className="relative w-[90%] max-w-[500px] bg-white rounded-2xl border border-[#0066FF] shadow-[8px_8px_0_0_#084EC5] flex flex-col overflow-hidden opacity-100 transform scale-100 translate-y-0 transition-[opacity,transform] duration-200">
				<button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 w-6 h-6 bg-transparent border-0 p-0 cursor-pointer text-[#8C8C8C] opacity-70 transition-opacity duration-200 z-10 hover:opacity-100">
					<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
				<div className="p-6 flex flex-col gap-6">
					<h3 className="m-0 text-center pr-6">Pilih Avatar</h3>
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[300px] overflow-y-auto p-2">
						{AVATARS.map((url) => {
							const isActive = selected === url;
							return (
								<div key={url} onClick={() => onSelect && onSelect(url)} className={`w-[100px] h-[100px] rounded-full overflow-hidden cursor-pointer transition-[transform,box-shadow] duration-200 relative ${isActive ? 'scale-[1.05] shadow-[0_0_0_4px_#0066FF]' : 'scale-100 shadow-none'}`}>
									<img src={url} alt="Avatar" className="w-full h-full object-cover" />
									{isActive && (
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="w-10 h-10 text-white bg-black/50 rounded-full p-2 box-border">
												<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.7071 9.29289C17.0976 9.68342 17.0976 10.3166 16.7071 10.7071L11.7071 15.7071C11.3166 16.0976 10.6834 16.0976 10.2929 15.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929C7.68342 10.9024 8.31658 10.9024 8.70711 11.2929L11 13.5858L15.2929 9.29289C15.6834 8.90237 16.3166 8.90237 16.7071 9.29289Z" fill="currentColor"></path>
												</svg>
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
					<div className="flex gap-6 mt-4">
						<button onClick={onClose} className="flex-1 p-4 rounded-lg border border-[#262626] font-['Raleway'] font-bold text-[14px] leading-4 cursor-pointer transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-white text-[#262626] scale-100 opacity-100 active:scale-95">Batal</button>
						<button onClick={onClose} className="flex-1 p-4 rounded-lg border-0 font-['Raleway'] font-bold text-[14px] leading-4 cursor-pointer transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.34,2,0.64,1)] bg-[#0066FF] text-white scale-100 opacity-100">Simpan</button>
					</div>
				</div>
			</div>
		</div>
	);
}


