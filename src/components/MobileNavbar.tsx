import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet';
import { cn } from '../utils/tw';
import { Button } from './ui/button';

const MobileNavbar = () => {
	const navLinks = [
		{
			path: '/',
			label: 'Home',
		},
		{
			path: '/about',
			label: 'About',
		},
		{
			path: '/blog',
			label: 'Blog',
		},
	];
	return (
		<div className={cn('[@media(min-width:769px)]:hidden', 'block')}>
			<Sheet>
				<SheetTrigger>
					<Button
						variant="outline"
						className="absolute top-4 right-4 font-bold"
					>
						A
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="bg-white">
					<ul className="bg-white">
						<li className="mb-10">
							<a className="text-2xl font-black text-black" href="/">
								Alfin Aditya
							</a>
						</li>
						{navLinks.map((navLink) => (
							<li className="text-black mb-2" key={navLink.path}>
								<SheetClose>
									<NavLink
										activeClassName="text-main font-semibold"
										href={navLink.path}
									>
										{navLink.label}
									</NavLink>
								</SheetClose>
							</li>
						))}
						<li>
							<a className="text-black" href="mailto:alfinaditia02@gmail.com">
								Contact
							</a>
						</li>
					</ul>
				</SheetContent>
			</Sheet>
		</div>
	);
};

interface Props {
	href: string;
	activeClassName: string;
	children: React.ReactNode;
}

const NavLink: React.FC<Props> = ({ activeClassName, href, children }) => {
	const currentPath = window.location.pathname;
	// const currentPath = pathname.slice(1); // remove the first "/"
	const active = activeClassName;
	return (
		<a className={currentPath === href ? active : ''} href={href}>
			{children}
		</a>
	);
};

export default MobileNavbar;
