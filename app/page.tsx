'use client';

import { useMemo, useState } from 'react';

type Card = { id:string; name:string; file:string; essence:string };
type Spread = { id:number; name:string; subtitle:string; positions:string[] };
type Category = { name:string; questions:string[]; recommended:number };

const cards:Card[] = [
  ["00","El Loco","00-el-loco.png","inicio, libertad y salto hacia lo desconocido"],
  ["01","El Mago","01-el-mago.png","recursos, iniciativa y capacidad de actuar"],
  ["02","La Sacerdotisa","02-la-sacerdotisa.png","silencio, intuición y conocimiento interior"],
  ["03","La Emperatriz","03-la-emperatriz.png","deseo, creación y aquello que necesita cuidado"],
  ["04","El Emperador","04-el-emperador.png","estructura, límites y responsabilidad"],
  ["05","El Sacerdote","05-el-sacerdote.png","valores, aprendizaje y marcos compartidos"],
  ["06","Los Enamorados","06-los-enamorados.png","elección, vínculo y coherencia"],
  ["07","El Carro","07-el-carro.png","dirección, voluntad y avance"],
  ["08","La Fuerza","08-la-fuerza.png","coraje sereno e integración del impulso"],
  ["09","El Ermitaño","09-el-ermitaño.png","discernimiento, retiro fértil y búsqueda"],
  ["10","La Rueda de la Fortuna","10-la-rueda-de-la-fortuna.png","cambio de ciclo y factores no controlables"],
  ["11","La Justicia","11-la-justicia.png","hechos, límites y responsabilidad"],
  ["12","El Colgado","12-el-colgado.png","pausa, perspectiva y renuncia a forzar"],
  ["13","La Muerte","13-la-muerte.png","fin de una forma y transformación"],
  ["14","La Templanza","14-la-templanza.png","integración, diálogo, tiempo y equilibrio"],
  ["15","El Diablo","15-el-diablo.png","deseo, intensidad, apego y poder personal"],
  ["16","La Torre","16-la-torre.png","ruptura de una estructura que ya no sostiene"],
  ["17","La Estrella","17-la-estrella.png","confianza, vulnerabilidad e inspiración"],
  ["18","La Luna","18-la-luna.png","incertidumbre, proyección, miedo e intuición"],
  ["19","El Sol","19-el-sol.png","claridad, vitalidad y evidencia"],
  ["20","El Juicio","20-el-juicio.png","despertar, revisión y llamada a responder"],
  ["21","El Mundo","21-el-mundo.png","culminación, integración y cambio de nivel"],
  ["22","As de Copas","22-as-de-copas.png","una expresión de la energía del palo"],
  ["23","Dos de Copas","23-dos-de-copas.png","una expresión de la energía del palo"],
  ["24","Tres de Copas","24-tres-de-copas.png","una expresión de la energía del palo"],
  ["25","Cuatro de Copas","25-cuatro-de-copas.png","una expresión de la energía del palo"],
  ["26","Cinco de Copas","26-cinco-de-copas.png","una expresión de la energía del palo"],
  ["27","Seis de Copas","27-seis-de-copas.png","una expresión de la energía del palo"],
  ["28","Siete de Copas","28-siete-de-copas.png","una expresión de la energía del palo"],
  ["29","Ocho de Copas","29-ocho-de-copas.png","una expresión de la energía del palo"],
  ["30","Nueve de Copas","30-nueve-de-copas.png","una expresión de la energía del palo"],
  ["31","Diez de Copas","31-diez-de-copas.png","una expresión de la energía del palo"],
  ["32","Sota de Copas","32-sota-de-copas.png","una expresión de la energía del palo"],
  ["33","Caballero de Copas","33-caballero-de-copas.png","una expresión de la energía del palo"],
  ["34","Reina de Copas","34-reina-de-copas.png","una expresión de la energía del palo"],
  ["35","Rey de Copas","35-rey-de-copas.png","una expresión de la energía del palo"],
  ["36","As de Espadas","36-as-de-espadas.png","una expresión de la energía del palo"],
  ["37","Dos de Espadas","37-dos-de-espadas.png","una expresión de la energía del palo"],
  ["38","Tres de Espadas","38-tres-de-espadas.png","una expresión de la energía del palo"],
  ["39","Cuatro de Espadas","39-cuatro-de-espadas.png","una expresión de la energía del palo"],
  ["40","Cinco de Espadas","40-cinco-de-espadas.png","una expresión de la energía del palo"],
  ["41","Seis de Espadas","41-seis-de-espadas.png","una expresión de la energía del palo"],
  ["42","Siete de Espadas","42-siete-de-espadas.png","una expresión de la energía del palo"],
  ["43","Ocho de Espadas","43-ocho-de-espadas.png","una expresión de la energía del palo"],
  ["44","Nueve de Espadas","44-nueve-de-espadas.png","una expresión de la energía del palo"],
  ["45","Diez de Espadas","45-diez-de-espadas.png","una expresión de la energía del palo"],
  ["46","Sota de Espadas","46-sota-de-espadas.png","una expresión de la energía del palo"],
  ["47","Caballero de Espadas","47-caballero-de-espadas.png","una expresión de la energía del palo"],
  ["48","Reina de Espadas","48-reina-de-espadas.png","una expresión de la energía del palo"],
  ["49","Rey de Espadas","49-rey-de-espadas.png","una expresión de la energía del palo"],
  ["50","As de Bastos","50-as-de-bastos.png","una expresión de la energía del palo"],
  ["51","Dos de Bastos","51-dos-de-bastos.png","una expresión de la energía del palo"],
  ["52","Tres de Bastos","52-tres-de-bastos.png","una expresión de la energía del palo"],
  ["53","Cuatro de Bastos","53-cuatro-de-bastos.png","una expresión de la energía del palo"],
  ["54","Cinco de Bastos","54-cinco-de-bastos.png","una expresión de la energía del palo"],
  ["55","Seis de Bastos","55-seis-de-bastos.png","una expresión de la energía del palo"],
  ["56","Siete de Bastos","56-siete-de-bastos.png","una expresión de la energía del palo"],
  ["57","Ocho de Bastos","57-ocho-de-bastos.png","una expresión de la energía del palo"],
  ["58","Nueve de Bastos","58-nueve-de-bastos.png","una expresión de la energía del palo"],
  ["59","Diez de Bastos","59-diez-de-bastos.png","una expresión de la energía del palo"],
  ["60","Sota de Bastos","60-sota-de-bastos.png","una expresión de la energía del palo"],
  ["61","Caballero de Bastos","61-caballero-de-bastos.png","una expresión de la energía del palo"],
  ["62","Reina de Bastos","62-reina-de-bastos.png","una expresión de la energía del palo"],
  ["63","Rey de Bastos","63-rey-de-bastos.png","una expresión de la energía del palo"],
  ["64","As de Oros","64-as-de-oros.png","una expresión de la energía del palo"],
  ["65","Dos de Oros","65-dos-de-oros.png","una expresión de la energía del palo"],
  ["66","Tres de Oros","66-tres-de-oros.png","una expresión de la energía del palo"],
  ["67","Cuatro de Oros","67-cuatro-de-oros.png","una expresión de la energía del palo"],
  ["68","Cinco de Oros","68-cinco-de-oros.png","una expresión de la energía del palo"],
  ["69","Seis de Oros","69-seis-de-oros.png","una expresión de la energía del palo"],
  ["70","Siete de Oros","70-siete-de-oros.png","una expresión de la energía del palo"],
  ["71","Ocho de Oros","71-ocho-de-oros.png","una expresión de la energía del palo"],
  ["72","Nueve de Oros","72-nueve-de-oros.png","una expresión de la energía del palo"],
  ["73","Diez de Oros","73-diez-de-oros.png","una expresión de la energía del palo"],
  ["74","Sota de Oros","74-sota-de-oros.png","una expresión de la energía del palo"],
  ["75","Caballero de Oros","75-caballero-de-oros.png","una expresión de la energía del palo"],
  ["76","Reina de Oros","76-reina-de-oros.png","una expresión de la energía del palo"],
  ["77","Rey de Oros","77-rey-de-oros.png","una expresión de la energía del palo"],
].map(x => ({ id:x[0], name:x[1], file:x[2], essence:x[3] }));

const spreads:Spread[] = [
  { id:1, name:"1 carta", subtitle:"Mensaje", positions:["Lo esencial ahora"] },
  { id:2, name:"2 cartas", subtitle:"Situación / orientación", positions:["Situación","Orientación"] },
  { id:3, name:"3 cartas", subtitle:"Origen / presente / tendencia", positions:["Origen","Presente","Tendencia"] },
  { id:31, name:"YO · EL OTRO · EL VÍNCULO", subtitle:"Lectura de relación", positions:["YO","EL OTRO","EL VÍNCULO"] },
  { id:5, name:"5 cartas", subtitle:"Lectura profunda", positions:["Dinámica","En juego","Lo no dicho","Dirección","Clave"] },
  { id:7, name:"7 cartas", subtitle:"Lectura profesional", positions:["Contexto","Tensión","Deseo","Miedo","Camino","Clave","Síntesis"] }
];

const categories:Category[] = [
  { name:"Amor y relaciones", recommended:31, questions:[
    "¿Qué necesito comprender sobre mi relación y hacia dónde se está moviendo?",
    "¿Qué piensa esta persona sobre nuestra situación?",
    "¿Qué siente esta persona respecto a mí y al vínculo?",
    "¿Qué intenciones muestra esta persona en relación con el vínculo?",
    "¿Qué está ocurriendo realmente entre nosotros?",
    "¿Qué necesito ver con claridad sobre este vínculo?"
  ]},
  { name:"Una decisión", recommended:5, questions:[
    "¿Qué necesito ver con claridad antes de tomar esta decisión?",
    "¿Qué estoy evitando considerar en esta elección?",
    "¿Qué me ayudará a elegir de forma coherente conmigo?",
    "¿Qué diferencia realmente los dos caminos que tengo delante?"
  ]},
  { name:"Trabajo y propósito", recommended:3, questions:[
    "¿Qué está pidiendo transformarse en mi vida profesional?",
    "¿Dónde está mi energía más fértil ahora?",
    "¿Qué necesito comprender sobre mi próximo paso profesional?"
  ]},
  { name:"Crecimiento personal", recommended:3, questions:[
    "¿Qué patrón necesito reconocer para avanzar?",
    "¿Qué parte de mí necesita atención en este momento?",
    "¿Qué aprendizaje está intentando abrirse paso?"
  ]},
  { name:"Pregunta libre", recommended:3, questions:[
    "¿Qué necesito comprender de la situación que estoy viviendo?",
    "¿Qué no estoy viendo todavía con suficiente claridad?",
    "¿Qué pregunta debería hacerme ahora?"
  ]}
];

const modes = [
  ["Lectura profunda","La dinámica emocional, interna y simbólica de la tirada."],
  ["Relacional","Cómo dialogan las cartas y qué dinámica aparece entre sus posiciones."],
  ["Proceso","Cómo se transforma el sentido desde el inicio hasta la síntesis."],
  ["Práctica","Qué preguntas y movimientos concretos puede abrir la lectura."]
];

function narrative(selected:Card[], spread:Spread, question:string) {
  const names = selected.map(c => c.name).join(" · ");
  const q = question || "la pregunta que has elegido";
  if (spread.id === 31) return `La tirada «YO · EL OTRO · EL VÍNCULO» organiza ${names} en tres planos. «YO» muestra tu posición ante ${q}; «EL OTRO» representa la dinámica que puede observarse alrededor de la otra persona sin convertir el símbolo en una afirmación literal sobre su mente; «EL VÍNCULO» muestra la cualidad que toma la relación entre ambos.`;
  if (spread.id === 1) return `${selected[0].name} concentra la lectura alrededor de ${q}. Su símbolo pone el foco en ${selected[0].essence}. La pregunta abierta es qué reconoces en esa imagen y qué cambia cuando la miras desde tu situación concreta.`;
  if (spread.id === 2) return `Las dos cartas forman un diálogo. La primera sitúa ${q} en «Situación» y la segunda abre «Orientación». El sentido aparece en la relación entre ambas, no en cada definición aislada.`;
  if (spread.id === 3) return `Las tres cartas forman una trayectoria. «Origen» muestra la raíz que sigue actuando; «Presente» concentra lo que está vivo ahora; «Tendencia» abre una posibilidad de desarrollo. Ante ${q}, la lectura invita a distinguir experiencia, elección y posibilidad.`;
  if (spread.id === 5) return `Las cinco posiciones profundizan en ${q}: «Dinámica» abre el movimiento, «En juego» muestra lo que está activo, «Lo no dicho» ilumina una zona todavía poco visible, «Dirección» propone una orientación y «Clave» integra el sentido.`;
  return `Las siete posiciones construyen una lectura profesional de ${q}. «Contexto» y «Tensión» sitúan el escenario; «Deseo» y «Miedo» muestran fuerzas internas; «Camino» abre una posibilidad de acción; «Clave» concentra el aprendizaje y «Síntesis» devuelve una visión más amplia.`;
}

export default function Home() {
  const shuffle = () => [...cards].sort(() => Math.random() - .5).map(c => c.id);
  const [cat,setCat] = useState(0);
  const [question,setQuestion] = useState(categories[0].questions[0]);
  const [customQuestion,setCustomQuestion] = useState("");
  const [spread,setSpread] = useState(31);
  const [picked,setPicked] = useState<string[]>([]);
  const [reading,setReading] = useState(false);
  const [mode,setMode] = useState(0);
  const [deckOrder,setDeckOrder] = useState<string[]>(shuffle);

  const current = spreads.find(s => s.id === spread)!;
  const selected = useMemo(() => picked.map(id => cards.find(c => c.id === id)!).filter(Boolean), [picked]);
  const activeQuestion = customQuestion.trim() || question;

  function resetDeck() { setDeckOrder(shuffle()); setPicked([]); setReading(false); }
  function selectCat(i:number) {
    setCat(i); setQuestion(categories[i].questions[0]); setCustomQuestion("");
    setSpread(categories[i].recommended); setPicked([]); setReading(false); setDeckOrder(shuffle());
  }
  function choose(id:string) {
    if (reading) return;
    setPicked(p => p.includes(id) ? p.filter(x => x !== id) : p.length < spread ? [...p,id] : p);
  }
  function chooseRandom() {
    const order = shuffle(); setDeckOrder(order); setPicked(order.slice(0,spread)); setReading(false);
  }

  return <main>
    <header className="topbar">
      <div className="brand">CARTAS</div>
      <div className="brandSub">LECTURA SIMBÓLICA</div>
    </header>

    <section className="welcome">
      <div className="eyebrow">01 · TU PREGUNTA</div>
      <h1>¿Qué quieres<br/><em>comprender?</em></h1>
      <p>Formula tu pregunta o elige una propuesta. La lectura se adapta a lo que estás buscando.</p>
    </section>

    <section className="questionSpace">
      <div className="sectionLabel">ELIGE UN TEMA</div>
      <div className="categories">
        {categories.map((c,i) => <button key={c.name} className={cat===i ? "pill active":"pill"} onClick={() => selectCat(i)}>{c.name}</button>)}
      </div>

      <div className="presetBox">
        <div className="presetTitle">PREGUNTAS PARA EMPEZAR</div>
        <div className="questionList">
          {categories[cat].questions.map(q => <button key={q} className={question===q && !customQuestion ? "preset active":"preset"} onClick={() => {setQuestion(q);setCustomQuestion("");}}>{q}</button>)}
        </div>
      </div>

      <div className="customQuestion">
        <label htmlFor="custom">TU PROPIA PREGUNTA <span>OPCIONAL</span></label>
        <input id="custom" value={customQuestion} onChange={e => setCustomQuestion(e.target.value)} placeholder="Escribe aquí tu pregunta..." />
        <p>Si prefieres, puedes continuar con una de las preguntas propuestas.</p>
      </div>

      <div className="questionEcho">“{activeQuestion}”</div>
    </section>

    <section className="spreadSection">
      <div className="eyebrow">02 · LA TIRADA</div>
      <h2>Elige la forma de mirar.</h2>
      <div className="spreadChoices">
        {spreads.map(s => <button key={s.id} className={spread===s.id ? "spreadChoice active":"spreadChoice"} onClick={() => {setSpread(s.id);setPicked([]);setReading(false);}}>
          <strong>{s.name}</strong><span>{s.subtitle}</span>
        </button>)}
      </div>
      <div className="recommendation">Para esta pregunta, la lectura propuesta es <b>{spreads.find(s => s.id===categories[cat].recommended)?.name}</b>.</div>
    </section>

    <section className="drawSection">
      <div className="eyebrow">03 · LA ELECCIÓN</div>
      <div className="drawHeader">
        <div><h2>Deja que la pregunta te guíe.</h2><p>La baraja se mezcla automáticamente. Todas las cartas comienzan boca abajo.</p></div>
        <div className="counter">{picked.length} / {spread}</div>
      </div>

      <div className={`spreadTable spread-${spread}`}>
        {current.positions.map((position,i) => {
          const card = selected[i];
          return <div className="slot" key={position}>
            <span className="slotNumber">{String(i+1).padStart(2,"0")}</span>
            <span className="slotName">{position}</span>
            {card ? <img src={`/cards/${card.file}`} alt={card.name} /> : <div className="slotBack">✦</div>}
            {card && <strong>{card.name}</strong>}
          </div>
        })}
      </div>

      <div className="deckIntro">Elige una carta de la mesa</div>
      <div className="deck">
        {deckOrder.map(id => {
          const c = cards.find(card => card.id===id)!;
          const isPicked = picked.includes(c.id);
          return <button key={c.id} className={isPicked ? "tarot picked":"tarot"} onClick={() => choose(c.id)} aria-label={isPicked ? c.name : "Carta boca abajo"}>
            {isPicked ? <img src={`/cards/${c.file}`} alt={c.name}/> : <><span>CARTAS</span><b>✦</b></>}
          </button>
        })}
      </div>

      <div className="actions">
        <button className="primary" disabled={picked.length!==spread} onClick={() => setReading(true)}>Ver mi lectura</button>
        <button className="secondary" onClick={chooseRandom}>Dejar que CARTAS elija</button>
        <button className="textButton" onClick={resetDeck}>Nueva lectura</button>
      </div>
    </section>

    {reading && <section className="reading">
      <div className="readingHeader">
        <div className="eyebrow">04 · TU LECTURA</div>
        <h2>Una mirada a tu pregunta.</h2>
        <div className="readingQuestion">“{activeQuestion}”</div>
      </div>

      <div className="modeBar">
        {modes.map((m,i) => <button key={m[0]} className={mode===i ? "mode active":"mode"} onClick={() => setMode(i)}>{m[0]}</button>)}
      </div>

      <div className={`readingCards reading-${spread}`}>
        {selected.map((c,i) => <article className="readingCard" key={c.id}>
          <div className="readingImage"><img src={`/cards/${c.file}`} alt={c.name}/></div>
          <div className="readingPosition">{current.positions[i]}</div>
          <h3>{c.name}</h3>
          <p>{c.essence}.</p>
          <details><summary>Profundizar</summary><p>Observa cómo este símbolo dialoga con la pregunta «{activeQuestion}» y con las cartas que lo rodean.</p></details>
        </article>)}
      </div>

      <div className="story">
        <div className="storyLabel">NARRACIÓN CONJUNTA · {modes[mode][0]}</div>
        <p>{narrative(selected,current,activeQuestion)}</p>
      </div>

      <div className="closing">
        <div className="storyLabel">UNA ÚLTIMA MIRADA</div>
        <p>¿Qué parte de esta lectura reconoces en tu realidad y qué necesitas observar antes de decidir?</p>
      </div>
    </section>}

    <footer>Las cartas se presentan como lenguaje simbólico de reflexión. La lectura no determina hechos futuros: te invita a mirar, relacionar y decidir con tu propio criterio.</footer>
  </main>;
}
