import Image from 'next/image';

const signalFragments = ['one', 'two', 'three', 'four'] as const;

export function TechnologyVisual() {
  const image = '/visuals/sections/technology-stack.png';

  return (
    <div className="technology-visual technology-visual-alive">
      <Image
        className="technology-base-image"
        src={image}
        width={1800}
        height={900}
        alt="Capas de tecnología: experiencia, interfaz, código, datos e inteligencia artificial"
      />
      <div className="technology-signal-fragments" aria-hidden="true">
        {signalFragments.map((fragment) => (
          <span className={`technology-signal-fragment fragment-${fragment}`} key={fragment}>
            <Image src={image} width={1800} height={900} alt="" />
          </span>
        ))}
      </div>
      <div className="tech-labels"><span>EXPERIENCIA</span><span>INTERFAZ</span><span>CÓDIGO</span><span>DATOS</span><span>IA</span></div>
    </div>
  );
}
