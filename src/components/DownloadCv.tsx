import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const DownloadCv = ({ className }: { className?: string }) => {
	return (
		<Button className={cn('w-min', className)} asChild>
			<a
				href="https://drive.google.com/file/d/1GiVHcwimMFl6z3dnOtvoRWFlO1kIu38q/view?usp=sharing"
				target="_blank"
				rel="noopener noreferrer"
			>
				Download CV
			</a>
		</Button>
	);
};

export default DownloadCv;
