interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div className={`surface-panel rounded-[28px] ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_72px_-40px_rgba(40,24,17,0.38)]' : ''} ${className}`}>
      {children}
    </div>
  );
}
