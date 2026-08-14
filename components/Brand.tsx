import Image from 'next/image';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-lockup${compact ? ' compact' : ''}`}>
      <span className="brand-symbol"><Image src="/logo-cynador.png" width={1000} height={280} alt="" /></span>
      <span className="brand-words"><b>CYNADOR</b><small>DIGITAL BUSINESS ENGINE</small></span>
    </span>
  );
}
