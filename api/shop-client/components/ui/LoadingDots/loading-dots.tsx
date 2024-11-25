import clsx from 'clsx';
import s from './loading-dots.module.css';
import { twMerge } from 'tailwind-merge';

const LoadingDots = ({ className }: { className?: string }) => {
  return (
    <span className={s.root}>
      <span className={twMerge(clsx(s.dot, "h-2 w-2 my-2",className))} key={`dot_1`} />
      <span className={twMerge(clsx(s.dot, "h-2 w-2 my-2",className))} key={`dot_2`} />
      <span className={twMerge(clsx(s.dot, "h-2 w-2 my-2",className))} key={`dot_3`} />
    </span>
  );
};

export default LoadingDots;
