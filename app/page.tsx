'use client';

import { useState } from 'react';

type Card = {
  id: string;
  name: string;
  file: string;
  essence: string;
  light: string;
  shadow: string;
  slot?: number;
};

type Spread = {
  id: number;
  name: string;
  subtitle: string;
  positions: string[];
};

type Category = {
  name: string;
  questions: string[];
  recommended: number;
};

const majors: Card[] = [
  ["00","El Loco","00-el-loco.png","inicio, libertad y salto hacia lo desconocido","atreverse sin exigir certezas","impulsividad o huida de la responsabilidad"],
  ["01","El Mago","01-el-mago.png","recursos, iniciativa y capacidad de actuar","agencia y creatividad","dispersión o manipulación"],
  ["02","La Sacerdotisa","02-la-sacerdotisa.png","silencio, intuición y conocimiento interior","escucha y percepción fina","pasividad, secreto o esperar que el otro adivine"],
  ["03","La Emperatriz","03-la-emperatriz.png","deseo, creación y aquello que necesita cuidado","nutrir y hacer crecer","sobreproteger o confundir cuidado con control"],
  ["04","El Emperador","04-el-emperador.png","estructura, límites y responsabilidad","estabilidad y autoridad propia","rigidez o necesidad de controlar"],
  ["05","El Sacerdote","05-el-sacerdote.png","valores, aprendizaje y marcos compartidos","sentido y guía","dogma o vivir según expectativas ajenas"],
  ["06","Los Enamorados","06-los-enamorados.png","elección, vínculo y coherencia","elegir desde los valores","indecisión o elegir por miedo a perder"],
  ["07","El Carro","07-el-carro.png","dirección, voluntad y avance","tomar las riendas","forzar o correr sin integrar fuerzas opuestas"],
  ["08","La Fuerza","08-la-fuerza.png","coraje sereno e integración del impulso","firmeza sin violencia","contención excesiva o lucha interna"],
  ["09","El Ermitaño","09-el-ermitaño.png","discernimiento, retiro fértil y búsqueda","escuchar la propia verdad","aislamiento o postergar indefinidamente"],
  ["10","La Rueda de la Fortuna","10-la-rueda-de-la-fortuna.png","cambio de ciclo y factores no controlables","adaptarse al movimiento","pasividad ante el cambio"],
  ["11","La Justicia","11-la-justicia.png","hechos, límites y responsabilidad","claridad y decisiones sostenibles","juicio frío o autoexigencia"],
  ["12","El Colgado","12-el-colgado.png","pausa, perspectiva y renuncia a forzar","ver de otra manera","estancamiento o sacrificio sin sentido"],
  ["13","La Muerte","13-la-muerte.png","fin de una forma y transformación","soltar lo agotado","resistencia al cambio"],
  ["14","La Templanza","14-la-templanza.png","integración, diálogo, tiempo y equilibrio","regular y mezclar sin borrar diferencias","diluir necesidades o esperar demasiado"],
  ["15","El Diablo","15-el-diablo.png","deseo, intensidad, apego y poder personal","reconocer el deseo sin negarlo","dependencia, compulsión o vínculo que encadena"],
  ["16","La Torre","16-la-torre.png","ruptura de una estructura que ya no sostiene","liberación y verdad","caos o aferrarse a lo que cae"],
  ["17","La Estrella","17-la-estrella.png","confianza, vulnerabilidad e inspiración","recuperar orientación","idealización o esperar una salvación externa"],
  ["18","La Luna","18-la-luna.png","incertidumbre, proyección, miedo e intuición","dar espacio a lo inconsciente","confundir temor con intuición o fantasía con evidencia"],
  ["19","El Sol","19-el-sol.png","claridad, vitalidad y evidencia","mostrar y compartir","exceso de certeza o necesidad de reconocimiento"],
  ["20","El Juicio","20-el-juicio.png","despertar, revisión y llamada a responder","reconocer lo aprendido","culpa o vivir atrapado en el pasado"],
  ["21","El Mundo","21-el-mundo.png","culminación, integración y cambio de nivel","completar e integrar","cerrar en falso o no reconocer lo conseguido"]
].map(([id,name,file,essence,light,shadow]) => ({id,name,file,essence,light,shadow}));

const suitData = [
  {start:22, names:["As de Copas","Dos de Copas","Tres de Copas","Cuatro de Copas","Cinco de Copas","Seis de Copas","Siete de Copas","Ocho de Copas","Nueve de Copas","Diez de Copas","Sota de Copas","Caballero de Copas","Reina de Copas","Rey de Copas"], files:["as-de-copas","dos-de-copas","tres-de-copas","cuatro-de-copas","cinco-de-copas","seis-de-copas","siete-de-copas","ocho-de-copas","nueve-de-copas","diez-de-copas","sota-de-copas","caballero-de-copas","reina-de-copas","rey-de-copas"], area:"emociones, vínculos y mundo afectivo"},
  {start:36, names:["As de Espadas","Dos de Espadas","Tres de Espadas","Cuatro de Espadas","Cinco de Espadas","Seis de Espadas","Siete de Espadas","Ocho de Espadas","Nueve de Espadas","Diez de Espadas","Sota de Espadas","Caballero de Espadas","Reina de Espadas","Rey de Espadas"], files:["as-de-espadas","dos-de-espadas","tres-de-espadas","cuatro-de-espadas","cinco-de-espadas","seis-de-espadas","siete-de-espadas","ocho-de-espadas","nueve-de-espadas","diez-de-espadas","sota-de-espadas","caballero-de-espadas","reina-de-espadas","rey-de-espadas"], area:"pensamiento, verdad y conflicto mental"},
  {start:50, names:["As de Bastos","Dos de Bastos","Tres de Bastos","Cuatro de Bastos","Cinco de Bastos","Seis de Bastos","Siete de Bastos","Ocho de Bastos","Nueve de Bastos","Diez de Bastos","Sota de Bastos","Caballero de Bastos","Reina de Bastos","Rey de Bastos"], files:["as-de-bastos","dos-de-bastos","tres-de-bastos","cuatro-de-bastos","cinco-de-bastos","seis-de-bastos","siete-de-bastos","ocho-de-bastos","nueve-de-bastos","diez-de-bastos","sota-de-bastos","caballero-de-bastos","reina-de-bastos","rey-de-bastos"], area:"energía, deseo, acción y creatividad"},
  {start:64, names:["As de Oros","Dos de Oros","Tres de Oros","Cuatro de Oros","Cinco de Oros","Seis de Oros","Siete de Oros","Ocho de Oros","Nueve de Oros","Diez de Oros","Sota de Oros","Caballero de Oros","Reina de Oros","Rey de Oros"], files:["as-de-oros","dos-de-oros","tres-de-oros","cuatro-de-oros","cinco-de-oros","seis-de-oros","siete-de-oros","ocho-de-oros","nueve-de-oros","diez-de-oros","sota-de-oros","caballero-de-oros","reina-de-oros","rey-de-oros"], area:"materia, recursos, cuerpo y construcción"}
];

const rankEssence = [
  "inicio y potencial de la energía",
  "encuentro, equilibrio y primera relación",
  "desarrollo, expresión y expansión inicial",
  "estructura, pausa y necesidad de estabilidad",
  "fricción, cambio y desafío",
  "movimiento, equilibrio y recuperación de lo aprendido",
  "evaluación, posición y defensa de lo que importa",
  "movimiento, práctica y aceleración",
  "madurez, resistencia y fruto de la experiencia",
  "culminación, carga e integración del ciclo",
  "aprendizaje, curiosidad y comienzo consciente",
  "movimiento, iniciativa y expresión activa",
  "madurez, presencia y dominio sensible",
  "dominio, experiencia y capacidad de dirección"
];

const minors: Card[] = suitData.flatMap(suit =>
  suit.names.map((name,i) => ({
    id:String(suit.start+i).padStart(2,"0"),
    name,
    file:`${String(suit.start+i).padStart(2,"0")}-${suit.files[i]}.png`,
    essence:`${rankEssence[i]}, en el ámbito de ${suit.area}`,
    light:i===0?"abrir una posibilidad y darle espacio":i<10?"integrar la experiencia y actuar con conciencia":i===10?"explorar y aprender con apertura":i===11?"llevar la energía hacia una experiencia":i===12?"encarnar la cualidad del palo con autonomía":"dirigir recursos con visión y responsabilidad",
    shadow:i<4?"no reconocer o no canalizar el potencial":i<10?"dispersar la energía o avanzar sin revisar":i===10?"inmadurez o falta de continuidad":i===11?"precipitación o dificultad para sostener el rumbo":i===12?"exceso de entrega o necesidad de demostrar":"rigidez, control o identificación excesiva con el poder"
  }))
);

const cards: Card[] = [...majors,...minors];
// Las cartas se seleccionan y se renderizan desde deckOrder, sin un segundo estado de selección.

function imageSources(card: Card){
  const sources = [
    `/cards/${card.file}`,
    `/${card.file}`,
  ];

  // Fallbacks for the two filenames that have caused path/name mismatches.
  if (card.id === "09") {
    sources.push("/cards/09-el-ermitano.png", "/09-el-ermitano.png");
    sources.push("/cards/el-ermitaño.png", "/el-ermitaño.png");
  }
  if (card.id === "29") {
    sources.push("/cards/ocho-de-copas.png", "/ocho-de-copas.png");
    sources.push("/cards/29-ocho-de-copas.jpg", "/29-ocho-de-copas.jpg");
  }

  return [...new Set(sources)];
}

function CardImage({card, className, alt}:{card:Card; className?:string; alt:string}){
  const sources = imageSources(card);
  const [sourceIndex, setSourceIndex] = useState(0);

  return (
    <img
      className={className}
      src={sources[sourceIndex]}
      alt={alt}
      onError={() => {
        setSourceIndex(index => Math.min(index + 1, sources.length - 1));
      }}
    />
  );
}

const spreads: Spread[] = [
  {id:1,name:"1 carta",subtitle:"mensaje",positions:["lo esencial ahora"]},
  {id:2,name:"2 cartas",subtitle:"situación / orientación",positions:["situación","orientación"]},
  {id:3,name:"3 cartas",subtitle:"",positions:["origen","presente","tendencia"]},
  {id:5,name:"5 cartas",subtitle:"lectura profunda",positions:["dinámica","en juego","lo no dicho","dirección","clave"]},
  {id:7,name:"7 cartas",subtitle:"lectura profesional",positions:["contexto","tensión","deseo","miedo","camino","clave","síntesis"]}
];

const threeCardVariants = [
  {id:0, label:"origen / presente / tendencia", positions:["origen","presente","tendencia"]},
  {id:1, label:"yo / el otro / el vínculo", positions:["yo","el otro","el vínculo"]},
  {id:2, label:"qué siente / qué piensa / qué intenciones", positions:["qué siente","qué piensa","qué intenciones"]}
];

const categories: Category[] = [
  {name:"Amor y relaciones",recommended:3,questions:[
    "¿Qué necesito comprender sobre mi relación y hacia dónde se está moviendo?",
    "¿Qué piensa esta persona sobre nuestra situación?",
    "¿Qué siente esta persona respecto a mí y al vínculo?",
    "¿Qué intenciones muestra esta persona en relación con el vínculo?",
    "¿Qué está ocurriendo realmente entre nosotros?",
    "¿Qué necesito ver con claridad sobre este vínculo?"
  ]},
  {name:"Una decisión",recommended:5,questions:[
    "¿Qué necesito ver con claridad antes de tomar esta decisión?",
    "¿Qué estoy evitando considerar en esta elección?",
    "¿Qué me ayudará a elegir de forma coherente conmigo?",
    "¿Qué diferencia realmente los dos caminos que tengo delante?"
  ]},
  {name:"Trabajo y propósito",recommended:3,questions:[
    "¿Qué está pidiendo transformarse en mi vida profesional?",
    "¿Dónde está mi energía más fértil ahora?",
    "¿Qué necesito comprender sobre mi próximo paso profesional?"
  ]},
  {name:"Crecimiento personal",recommended:3,questions:[
    "¿Qué patrón necesito reconocer para avanzar?",
    "¿Qué parte de mí necesita atención en este momento?",
    "¿Qué aprendizaje está intentando abrirse paso?"
  ]},
  {name:"Pregunta libre",recommended:3,questions:[
    "¿Qué necesito comprender de la situación que estoy viviendo?",
    "¿Qué no estoy viendo todavía con suficiente claridad?",
    "¿Qué pregunta debería hacerme ahora?"
  ]}
];

const modes = [
  ["Lectura profunda","La dinámica emocional, interna y simbólica de la tirada."],
  ["Relacional","Cómo dialogan las cartas entre sí y qué ocurre en el vínculo."],
  ["Proceso","La evolución de la primera carta hasta la síntesis final."],
  ["Práctica","Qué preguntas y movimientos concretos sugiere la lectura."]
];

export default function Home(){
  const shuffleCards = () => {
    const order = [...cards];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  };
  const [cat, setCat] = useState(0);
  const [question, setQuestion] = useState(categories[0].questions[0]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [spread, setSpread] = useState(3);
  const [threeCardVariant, setThreeCardVariant] = useState(1);
  // ÚNICA FUENTE DE VERDAD:
  // deckOrder contiene las 78 cartas, su orden actual y, si están giradas,
  // la posición exacta que ocupan en la tirada.
  // La mesa superior, las marcas de la baraja y la lectura nacen de este mismo estado.
  const [reading, setReading] = useState(false);
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(0);

  const makeDeck = () =>
    shuffleCards().map(card => ({...card, slot: undefined}));

  const [deckOrder, setDeckOrder] = useState<Card[]>(() => cards.map(card => ({...card, slot: undefined})));

  const baseSpread = spreads.find(s => s.id === spread)!;
  const current = spread === 3
    ? {...baseSpread, subtitle: threeCardVariants[threeCardVariant].label, positions: threeCardVariants[threeCardVariant].positions}
    : baseSpread;
  const count = current.positions.length;
  const effectiveQuestion = customQuestion.trim() || question;

  // Las cartas elegidas se leen DIRECTAMENTE del mismo deckOrder.
  const selected = deckOrder
    .filter(card => card.slot != null)
    .sort((a,b) => (a.slot as number) - (b.slot as number))
    .slice(0, count);

  // Invariante de producto: una posición solo puede pertenecer a una carta
  // y una carta solo puede tener una posición. Si este estado se rompe,
  // el problema queda detectado en consola en lugar de producir una lectura falsa.
  if (process.env.NODE_ENV !== "production") {
    const slots = selected.map(card => card.slot);
    const uniqueSlots = new Set(slots);
    if (slots.length !== uniqueSlots.size || selected.length > count) {
      console.error("CARTAS: estado de tirada inválido", {selected, count});
    }
  }

  const selectedFilled = selected;
  const picked = selectedFilled;
  const [zoomCard, setZoomCard] = useState<Card | null>(null);

  function freshDeck(){
    return makeDeck();
  }

  function resetDeck(){
    setDeckOrder(cards.map(card => ({...card, slot: undefined})));
    setReading(false);
    setStarted(false);
    setMode(0);
    setZoomCard(null);
  }

  function startReading(){
    setDeckOrder(makeDeck());
    setStarted(true);
    setReading(false);
    setMode(0);
    setZoomCard(null);
  }

  function selectCat(i:number){
    setCat(i);
    setQuestion(categories[i].questions[0]);
    setCustomQuestion("");
    setSpread(categories[i].recommended);
    setThreeCardVariant(i === 0 ? 1 : 0);
    setDeckOrder(cards.map(card => ({...card, slot: undefined})));
    setReading(false);
    setStarted(false);
    setMode(0);
    setZoomCard(null);
  }

  // Este es el único mecanismo de selección.
  // La carta pulsada conserva su posición dentro de la baraja y recibe un slot.
  // La misma carta/slot alimenta arriba, abajo y la lectura.
  function choose(card:Card){
    if(reading) return;

    setDeckOrder(order => {
      const clicked = order.find(item => item.id === card.id);
      if(!clicked) return order;

      // Si ya está girada, la quitamos y compactamos las posiciones.
      if(clicked.slot != null){
        const removedSlot = clicked.slot;
        return order.map(item => {
          if(item.id === card.id) return {...item, slot: undefined};
          if(item.slot != null && item.slot > removedSlot) {
            return {...item, slot: item.slot - 1};
          }
          return item;
        });
      }

      // Si aún quedan posiciones libres, esta carta ocupa la siguiente.
      const selectedCount = order.filter(item => item.slot != null).length;
      if(selectedCount >= count) return order;

      const nextSlot = selectedCount + 1;

      return order.map(item =>
        item.id === card.id
          ? {...item, slot: nextSlot}
          : item
      );
    });
  }

  function changeCardAt(index:number){
    if(reading) return;

    setDeckOrder(order =>
      order.map(item => {
        if(item.slot === index + 1) return {...item, slot: undefined};
        if(item.slot != null && item.slot > index + 1) {
          return {...item, slot: item.slot - 1};
        }
        return item;
      })
    );
  }

  function random(){
    // Tirada al Azar: baraja de nuevo y asigna las primeras posiciones.
    const order = shuffleCards().map((card, index) => ({
      ...card,
      slot: index < count ? index + 1 : undefined
    }));
    setDeckOrder(order);
    setStarted(true);
    setReading(false);
    setMode(0);
    setZoomCard(null);
  }

  function interpret(){
    if(picked.length === count) {
      setReading(true);
      requestAnimationFrame(() => document.getElementById("lectura")?.scrollIntoView({behavior:"smooth", block:"start"}));
    }
  }

  function shareText(){
    return [
      "Tarot Aluzca · anna oriol",
      `Pregunta: ${effectiveQuestion}`,
      `Tirada: ${current.name} — ${current.positions.join(" / ")}`,
      ...selected.map((card, i) => `${i+1}. ${current.positions[i]} · ${card.name}: ${contextualReading(card, i)}`),
      "",
      "Lectura simbólica para la reflexión personal."
    ].join("\\n");
  }

  async function shareReading(){
    const text = shareText();
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({title:"Tarot Aluzca · Mi tirada", text}); return; }
      catch (error) { if (error instanceof Error && error.name === "AbortError") return; }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function cardArea(c:Card){
    if(c.id.length && Number(c.id) < 22) return "Arcano Mayor";
    const n = Number(c.id);
    if(n < 36) return "Copas";
    if(n < 50) return "Espadas";
    if(n < 64) return "Bastos";
    return "Oros";
  }

  function contextualReading(c:Card, i:number){
    const position = current.positions[i];
    const neighbours = [selected[i-1], selected[i+1]].filter((card): card is Card => Boolean(card));
    const neighbourText = neighbours.length
      ? ` Al dialogar con ${neighbours.map(n => n.name).join(" y ")}, esta cualidad adquiere un matiz que conviene observar dentro del conjunto.`
      : " Aquí la carta funciona como núcleo de la lectura, por lo que su posición tiene un peso especial.";

    if(spread === 1) return `${c.name} ocupa la posición «${position}». El símbolo concentra la lectura en ${c.essence}. Su expresión luminosa es ${c.light}; cuando se bloquea puede aparecer como ${c.shadow}. La clave está en llevar esta imagen a tu situación concreta y observar qué encaja y qué necesita contraste.`;
    if(spread === 2) return `En «${position}», ${c.name} responde desde ${c.essence}. No es una definición aislada: esta posición le da dirección a la carta. Su recurso es ${c.light}; su tensión, ${c.shadow}.${neighbourText}`;
    if(spread === 3) {
      if(threeCardVariant === 1 && i === 0) return `En «yo», ${c.name} devuelve la mirada a tu lugar dentro del vínculo: ${c.essence}. La carta señala qué puedes observar, expresar y elegir desde tu propia posición. Su recurso es ${c.light}; su punto de atención, ${c.shadow}.${neighbourText}`;
      if(threeCardVariant === 1 && i === 1) return `En «el otro», ${c.name} representa simbólicamente la dinámica que percibes en la otra parte del vínculo: ${c.essence}. Se lee como una hipótesis simbólica que conviene contrastar con hechos, gestos y conversaciones, no como acceso literal a su mundo interior. Su recurso es ${c.light}; su punto de atención, ${c.shadow}.${neighbourText}`;
      if(threeCardVariant === 1 && i === 2) return `En «el vínculo», ${c.name} muestra la cualidad que toma el espacio entre ambos: ${c.essence}. Aquí importa observar qué se activa cuando tu posición y la dinámica del otro entran en relación. Su recurso es ${c.light}; su punto de atención, ${c.shadow}.${neighbourText}`;
      if(threeCardVariant === 2) return `En «${position}», ${c.name} aporta ${c.essence}. Esta variante organiza la lectura en tres planos simbólicos —qué siente, qué piensa y qué intenciones muestra la dinámica—. La carta no afirma literalmente el mundo interior de otra persona: invita a contrastar la percepción con hechos y conversaciones. Su recurso es ${c.light}; su punto de atención, ${c.shadow}.${neighbourText}`;
      return `En «${position}», ${c.name} aporta ${c.essence}. Como parte de una secuencia, interesa ver qué recibe de la carta anterior y qué prepara para la siguiente. La expresión disponible es ${c.light}; el punto de atención es ${c.shadow}.${neighbourText}`;
    }
    return `En «${position}», ${c.name} introduce ${c.essence}. La carta funciona como una pieza dentro de una arquitectura mayor: ${c.light} muestra el recurso disponible y ${c.shadow} señala dónde puede perderse la claridad.${neighbourText}`;
  }

  function synthesis(){
    const majorsCount = selectedFilled.filter(c => Number(c.id) < 22).length;
    const areas = selectedFilled.map(cardArea);
    const repeated = areas.find(a => areas.filter(x => x === a).length > 1);
    const sequence = selectedFilled.map(c => c.name).join(" → ");
    let focus = repeated
      ? `Hay una concentración clara en ${repeated.toLowerCase()}, por lo que ese territorio merece una atención especial.`
      : "La tirada reparte la energía entre varios territorios, lo que sugiere una lectura que necesita integrar perspectivas distintas.";
    if(majorsCount >= 2) focus += " La presencia de varios Arcanos Mayores da peso a la dimensión de proceso y transformación de la pregunta.";
    return `La secuencia ${sequence} no se lee como una suma de significados. Primero miro la pregunta y las posiciones; después observo qué cartas se refuerzan, cuáles introducen tensión y dónde cambia el movimiento de la historia. ${focus} El punto de trabajo está en reconocer qué parte de la lectura describe una experiencia que ya puedes observar y qué parte abre una pregunta para seguir explorando.`;
  }

  function narrative(){
    const names = selectedFilled.map(c => c.name).join(" → ");
      if(spread === 1) return `${selectedFilled[0].name} concentra el mensaje de la tirada. La pregunta «${effectiveQuestion}» funciona como lente: el mismo arcano puede hablar de algo distinto según aquello que quieres comprender. La lectura invita a observar el símbolo en tu realidad y decidir qué significado tiene para ti.`;
    if(spread === 2) return `${names} construyen un diálogo. La primera carta establece el terreno y la segunda responde, corrige o reorienta ese terreno. La lectura gana profundidad cuando buscas la relación entre ambas en lugar de interpretar cada una por separado.`;
    if(spread === 3) return `${names} forman una trayectoria. El origen explica una raíz activa, el presente muestra dónde está concentrada la experiencia y la tendencia abre una posibilidad de desarrollo. La tendencia no se presenta como destino: cambia cuando cambia la manera de actuar, percibir o relacionarte con la situación.`;
    if(spread === 5) return `${names} forman una arquitectura de cinco movimientos. La dinámica abre la escena, lo que está en juego concentra el conflicto o deseo, lo no dicho introduce la zona menos visible, la dirección muestra hacia dónde puede organizarse la energía y la clave integra el aprendizaje. Cada carta modifica el significado de las demás.`;
    return `${names} forman un proceso completo. El contexto sitúa la experiencia; la tensión muestra dónde se concentra; deseo y miedo pueden empujar en sentidos distintos; el camino convierte esa tensión en posibilidad; la clave condensa el aprendizaje y la síntesis devuelve una mirada más amplia. La última carta no borra las anteriores: las reinterpreta.`;
  }

  return <main className="appShell">
    <header className="topbar">
      <a className="brand" href="#inicio" aria-label="Tarot Aluzca, inicio">
        <span className="brandMark"><img src="/ao-logo.png" alt="AO" /></span>
        <span className="brandText">
          <span className="brandName">TAROT ALUZCA</span>
          <span className="brandByline">anna oriol</span>
        </span>
      </a>
      <div className="headerRight">
        <div className="headerMeta">TAROT INTERACTIVO · 78 CARTAS</div>
        <div className="headerSubmeta">VIDA · SALUD · AUTOCONOCIMIENTO · PSICOLOGÍA</div>
      </div>
    </header>

    <section className="hero sectionBlock" id="inicio">
      <div className="heroCopy">
        <div className="eyebrow">TAROT ALUZCA · UN ESPACIO PARA MIRARTE</div>
        <h1>Preguntas que<br/><span>iluminan tu camino.</span></h1>
        <p className="heroIntro">Un espacio de tarot simbólico para explorar la vida cotidiana, el bienestar, el autoconocimiento y la psicología desde nuevas perspectivas.</p>
      </div>
      <div className="heroArtwork" aria-hidden="true">
        <img src="/portada.png" alt="" />
      </div>

      <div className="categories" role="tablist" aria-label="Temas">
        {categories.map((c,i) => <button className={cat===i ? "category active" : "category"} onClick={()=>selectCat(i)} key={c.name}>{c.name}</button>)}
      </div>

      <div className="questionPanel">
        <div className="label">Preguntas para empezar</div>
        <div className="questionList">
          {categories[cat].questions.map(q => <button className={question===q && !customQuestion.trim() ? "qoption active" : "qoption"} onClick={()=>{
  setQuestion(q);
  setCustomQuestion("");
  const nq = q.toLowerCase();
  if(nq.includes("siente") || nq.includes("piensa") || nq.includes("intenciones")) {
    setSpread(3);
    setThreeCardVariant(2);
    setDeckOrder(cards.map(card => ({...card, slot: undefined})));
    setReading(false);
    setStarted(false);
  } else if (cat === 0) {
    setSpread(3);
    setThreeCardVariant(1);
    setDeckOrder(cards.map(card => ({...card, slot: undefined})));
    setReading(false);
    setStarted(false);
  }
}} key={q}>{q}</button>)}
        </div>
        <div className="customQuestion">
          <div className="label">Tu propia pregunta <span>· opcional</span></div>
          <textarea value={customQuestion} placeholder="Escribe aquí tu pregunta..." onChange={e=>setCustomQuestion(e.target.value)} />
        </div>
      </div>
      <div className="questionEcho">“{effectiveQuestion}”</div>
    </section>

    <section className="sectionBlock spreadSection">
      <div className="eyebrow">02 · La tirada</div>
      <div className="sectionHeading"><div><h2>Elige la forma de mirar.</h2><p>La propuesta se adapta a tu pregunta, pero tú decides.</p></div></div>
      <div className="spreads">
        {spreads.map(s => s.id === 3 ? (
          <button
            key={s.id}
            className={spread===3 ? "spread active" : "spread"}
            onClick={()=>{setSpread(3);setDeckOrder(cards.map(card => ({...card, slot: undefined})));setReading(false);setStarted(false);setZoomCard(null);}}
            type="button"
          >
            <strong>3 cartas</strong>
            <span>elige una de las tres formas de mirar</span>
          </button>
        ) : (
          <button className={spread===s.id ? "spread active" : "spread"} onClick={()=>{setSpread(s.id);setDeckOrder(cards.map(card => ({...card, slot: undefined})));setReading(false);setStarted(false);setZoomCard(null);}} key={s.id} type="button">
            <strong>{s.name}</strong>
            <span>{s.subtitle}</span>
          </button>
        ))}
      </div>
      {spread === 3 && (
        <div className="threeVariants" aria-label="Opciones de la tirada de 3 cartas">
          {threeCardVariants.map(v => (
            <button
              type="button"
              key={v.id}
              className={threeCardVariant===v.id ? "threeVariant active" : "threeVariant"}
              onClick={()=>{setThreeCardVariant(v.id);setDeckOrder(cards.map(card => ({...card, slot: undefined})));setReading(false);setStarted(false);setZoomCard(null);}}
            >
              <span>{v.id+1}</span>
              <b>{v.label}</b>
            </button>
          ))}
        </div>
      )}
    </section>

    <section className="sectionBlock tableSection" id="mesa">
      <div className="eyebrow">03 · La mesa</div>
      <div className="pickHeader">
        <div><h2>{started ? "Elige tus cartas." : "Contempla la baraja."}</h2><p>{started ? "Toca una carta para incorporarla a la tirada. Puedes cambiar una elección antes de revelar la lectura." : "Las 78 cartas se muestran de cara. Cuando pulses Iniciar tirada, se mezclarán y podrás elegir."}</p></div>
        <div className="counter"><b>{picked.length}</b><span>/ {count}</span></div>
      </div>

      <div className="selectionArea">
      <div className="selectedSpread" aria-label="Tu tirada">
        {current.positions.map((position,i) => {
          const card = selected[i] ?? undefined;
          return <div className={card ? "drawSlot filled" : "drawSlot"} key={position}>
            <div className="drawTop"><span>{String(i+1).padStart(2,"0")}</span><b>{position}</b></div>
            <button
              className="drawCard"
              type="button"
              disabled={!card}
              onClick={() => card && setZoomCard(card)}
              aria-label={card ? `Ampliar ${card.name}` : "Elige una carta"}
            >
              {card ? (
                <>
                  <CardImage card={card} alt={card.name}/>
                  <span className="zoomHint" aria-hidden="true">⌕</span>
                </>
              ) : (
                <div className="emptyBack"><span>Elige una carta</span><i>✦</i></div>
              )}
            </button>
            <div className="drawName">
              {card ? card.name : "Elige una carta"}
              {card && <button className="changeCard" type="button" onClick={() => changeCardAt(i)}>Cambiar</button>}
            </div>
          </div>;
        })}
      </div>

        <div className="actions actionsCentered">
          {!started && <button className="primary" type="button" onClick={startReading}>Iniciar tirada</button>}
          <button className="secondary shuffleButton" onClick={startReading}>Mezclar</button>
          <button className="primary" disabled={picked.length!==count} onClick={interpret}>Ver mi lectura</button>
          <button className="secondary" onClick={random}>Tirada al Azar</button>
          <button className="textButton" onClick={resetDeck}>Nueva lectura</button>
        </div>
      </div>

      <div className="deckToolbar"><span>{started ? "78 CARTAS · BARAJADAS" : "78 CARTAS · VISTA CONTEMPLATIVA"}</span><small>{!started ? "Inicia la tirada para elegir" : picked.length===count ? "Tirada completa" : `Faltan ${count-picked.length}`}</small></div>
      <div className="deck" aria-label="Baraja de 78 cartas">
        {deckOrder.map((c) => {
          const pickNumber = c.slot != null ? c.slot - 1 : -1;
          const isPicked = pickNumber !== -1;
          return (
            <button
              className={`${isPicked ? "tarot picked" : "tarot"} ${!started ? "preStart" : ""}`}
              key={`${c.id}-${c.slot ?? 0}`}
              type="button"
              onClick={() => started && choose(c)}
              disabled={!started}
              aria-label={!started ? c.name : isPicked ? `${c.name}, posición ${pickNumber + 1}` : "Carta boca abajo"}
              title={!started ? c.name : isPicked ? `Seleccionada · posición ${pickNumber + 1}` : "Toca para elegir esta carta"}
            >
              <span className="tarotFlip">
                {started && <span className="cardFace cardFaceBack">
                  <span className="backFrame backFrameOuter"></span>
                  <span className="backFrame backFrameInner"></span>
                  <span className="backGarland backGarlandLeft"></span>
                  <span className="backGarland backGarlandRight"></span>
                  <span className="backMedallion">
                    <span className="backStar">✦</span>
                  </span>
                </span>}
                <span className="cardFace cardFaceFront">
                  <CardImage card={c} alt={c.name}/>
                </span>
              </span>
              {isPicked && <span className="pickedMark">{pickNumber + 1}</span>}
            </button>
          );
        })}
      </div>


    </section>

    {reading && <section className="sectionBlock readingSection" id="lectura">
      <div className="eyebrow">04 · La revelación</div>
      <div className="readingIntro">
        <div><h2>Ahora mira la historia.</h2><p className="readingQuestion">“{effectiveQuestion}”</p></div>
        <div className="readingBadge">Lectura {current.name}</div>
        <button className="secondary" type="button" onClick={shareReading}>Compartir tirada</button>
      </div>

      <div className="readingModes">
        {modes.map((m,i)=><button className={mode===i ? "mode active" : "mode"} onClick={()=>setMode(i)} key={m[0]}><b>{m[0]}</b><span>{m[1]}</span></button>)}
      </div>

      <div className="expertGrid">
        <div className="expertCard mainSynthesis"><div className="label">Lo que veo</div><p>{synthesis()}</p></div>
        <div className="expertCard"><div className="label">La conversación entre las cartas</div><p>{narrative()}</p></div>
      </div>

      <div className="positionReadings">
        <div className="readingLabel">Lectura carta a carta</div>
        {selected.map((c,i)=> c ? <article className="positionReading" key={`${c.id}-${i}`}>
          <div className="positionNumber">{String(i+1).padStart(2,"0")}</div>
          <button className="readingCardThumb" type="button" onClick={() => setZoomCard(c)} aria-label={`Ampliar ${c.name}`}>
            <CardImage card={c} alt={c.name}/>
            <span className="zoomHint" aria-hidden="true">⌕</span>
          </button>
          <div className="positionInfo"><span>{current.positions[i]}</span><h3>{c.name}</h3><small>{cardArea(c)}</small></div>
          <div className="positionText"><p>{contextualReading(c,i)}</p><div className="lightShadow"><span><b>Luz</b> {c.light}</span><span><b>Sombra</b> {c.shadow}</span></div></div>
        </article> : null)}
      </div>

      <div className="storyBlock"><div className="label">La historia · {modes[mode][0]}</div><p>{narrative()}</p></div>
      <div className="deepQuestion"><div className="label">Lo que te preguntaría</div><p>¿Qué parte de esta lectura reconoces ya en tu realidad y qué conversación, hecho o decisión puede ayudarte a comprobarla?</p></div>
    </section>}

    {zoomCard && (
      <div className="cardZoomOverlay" role="dialog" aria-modal="true" aria-label={`Carta ${zoomCard.name}`} onClick={() => setZoomCard(null)}>
        <div className="cardZoomPanel" onClick={e => e.stopPropagation()}>
          <button className="cardZoomClose" type="button" onClick={() => setZoomCard(null)} aria-label="Cerrar">×</button>
          <CardImage card={zoomCard} alt={zoomCard.name}/>
          <div className="zoomCaption">{zoomCard.name}</div>
        </div>
      </div>
    )}

    <footer>El tarot se presenta aquí como lenguaje simbólico de reflexión. La lectura abre perspectivas; tus decisiones siguen siendo tuyas.</footer>
  </main>;
}
