'use client';

import { useMemo, useState } from 'react';

type Card = {
  id: string;
  name: string;
  file: string;
  essence: string;
  light: string;
  shadow: string;
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
  ["09","El Ermitaño","09-el-ermitano.png","discernimiento, retiro fértil y búsqueda","escuchar la propia verdad","aislamiento o postergar indefinidamente"],
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

const spreads: Spread[] = [
  {id:1,name:"1 carta",subtitle:"Mensaje",positions:["Lo esencial ahora"]},
  {id:2,name:"2 cartas",subtitle:"Situación / orientación",positions:["Situación","Orientación"]},
  {id:3,name:"3 cartas",subtitle:"Origen / presente / tendencia",positions:["Origen","Presente","Tendencia"]},
  {id:31,name:"YO · EL OTRO · EL VÍNCULO",subtitle:"Lectura de relación",positions:["YO","EL OTRO","EL VÍNCULO"]},
  {id:5,name:"5 cartas",subtitle:"Lectura profunda",positions:["Dinámica","En juego","Lo no dicho","Dirección","Clave"]},
  {id:7,name:"7 cartas",subtitle:"Lectura profesional",positions:["Contexto","Tensión","Deseo","Miedo","Camino","Clave","Síntesis"]}
];

const categories: Category[] = [
  {name:"Amor y relaciones",recommended:31,questions:[
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

function narrative(selected:Card[], spread:Spread, q:string){
  const names = selected.map(c=>c.name).join(" → ");
  if(spread.id===31 && selected.length===3)
    return `La secuencia ${names} se lee como una dinámica de tres planos: YO, EL OTRO y EL VÍNCULO. La primera carta muestra tu posición ante la pregunta; la segunda representa una dinámica que puede observarse en la otra persona sin convertir el símbolo en una afirmación literal sobre su mente; la tercera muestra la cualidad que toma el vínculo entre ambos. Para profundizar en «${q}», observa especialmente dónde se complementan, se tensan o se transforman las tres cartas.`;
  if(selected.length===1)
    return `${selected[0].name} concentra la lectura. Ante «${q}», no anuncia un hecho: pone el foco en ${selected[0].essence}. Su luz es ${selected[0].light}; su sombra, ${selected[0].shadow}. La pregunta que queda abierta es qué cambia cuando observas tu situación desde este símbolo.`;
  if(selected.length===2)
    return `La secuencia ${names} funciona como diálogo. ${selected[0].name} describe el terreno —${selected[0].essence}— y ${selected[1].name} modifica la respuesta desde ${selected[1].essence}. La lectura invita a pasar de comprender lo que ocurre a decidir cómo quieres relacionarte con ello.`;
  if(selected.length===3)
    return `La secuencia ${names} forma una trayectoria: el origen aporta la raíz, el presente muestra dónde se concentra la experiencia y la tendencia señala una posibilidad de desarrollo, no un destino. La lectura se vuelve útil al preguntar qué parte del pasado sigue actuando, qué decisión pertenece al presente y qué puede cambiar si esa decisión cambia.`;
  if(selected.length===5)
    return `La secuencia ${names} tiene una arquitectura clara. ${selected[0].name} abre la dinámica; ${selected[1].name} muestra qué está realmente en juego; ${selected[2].name} introduce la zona que todavía no está completamente visible; ${selected[3].name} responde con una dirección posible; y ${selected[4].name} integra el sentido de la tirada. No son cinco definiciones: cada carta modifica la anterior.`;
  return `La secuencia ${names} funciona como un proceso completo. Contexto y tensión muestran el escenario; deseo y miedo revelan fuerzas que pueden tirar en sentidos opuestos; el camino transforma esa tensión en posibilidad de acción; la clave condensa el aprendizaje y la síntesis devuelve una visión más amplia. La última carta no borra las anteriores: las reinterpreta.`;
}

export default function Home(){
  const shuffleIds = () => [...cards].sort(()=>Math.random()-.5).map(c=>c.id);
  const [cat,setCat] = useState(0);
  const [question,setQuestion] = useState(categories[0].questions[0]);
  const [customQuestion,setCustomQuestion] = useState("");
  const [spread,setSpread] = useState(31);
  const [picked,setPicked] = useState<string[]>([]);
  const [reading,setReading] = useState(false);
  const [mode,setMode] = useState(0);
  const [deckOrder,setDeckOrder] = useState<string[]>(shuffleIds);

  const current = spreads.find(s=>s.id===spread)!;
  const count = current.positions.length;
  const effectiveQuestion = customQuestion.trim() || question;

  const selected = useMemo(
    ()=>picked.map(id=>cards.find(c=>c.id===id)!).filter(Boolean),
    [picked]
  );

  function resetDeck(){
    setDeckOrder(shuffleIds());
    setPicked([]);
    setReading(false);
  }

  function selectCat(i:number){
    setCat(i);
    setQuestion(categories[i].questions[0]);
    setCustomQuestion("");
    setSpread(categories[i].recommended);
    resetDeck();
  }

  function choose(id:string){
    if(reading)return;
    setPicked(p=>p.includes(id)
      ? p.filter(x=>x!==id)
      : p.length<count ? [...p,id] : p
    );
  }

  function random(){
    const order=shuffleIds();
    setDeckOrder(order);
    setPicked(order.slice(0,count));
    setReading(false);
  }

  function interpret(){
    if(picked.length===count)setReading(true);
  }

  return <main>
    <header>
      <div className="logo">CARTAS</div>
      <div className="headerMeta">LECTURA SIMBÓLICA · 78 CARTAS</div>
    </header>

    <section className="hero">
      <div className="eyebrow">01 · La pregunta</div>
      <h1>Empieza por lo que<br/><em>quieres comprender.</em></h1>
      <p>Elige un tema o formula tu propia pregunta. CARTAS adapta la profundidad de la lectura a lo que estás buscando.</p>

      <div className="categories">
        {categories.map((c,i)=>
          <button className={cat===i?"category active":"category"} onClick={()=>selectCat(i)} key={c.name}>
            {c.name}
          </button>
        )}
      </div>

      <div className="question">
        <div className="label">Preguntas para empezar</div>
        <div className="questionList">
          {categories[cat].questions.map(q=>
            <button
              className={question===q && !customQuestion.trim()?"qoption active":"qoption"}
              onClick={()=>{setQuestion(q);setCustomQuestion("");}}
              key={q}
            >
              {q}
            </button>
          )}
        </div>

        <div className="customQuestion">
          <div className="label">Tu propia pregunta <span>· opcional</span></div>
          <textarea
            value={customQuestion}
            placeholder="Escribe aquí tu pregunta..."
            onChange={e=>setCustomQuestion(e.target.value)}
          />
          <p>Si prefieres, puedes continuar con una de las preguntas propuestas.</p>
        </div>
      </div>

      <div className="questionEcho">“{effectiveQuestion}”</div>
    </section>

    <section>
      <div className="eyebrow">02 · La tirada</div>
      <h2>Elige la forma de mirar.</h2>

      <div className="spreads">
        {spreads.map(s=>
          <button
            className={spread===s.id?"spread active":"spread"}
            onClick={()=>{setSpread(s.id);setPicked([]);setReading(false);}}
            key={s.id}
          >
            <strong>{s.name}</strong>
            <span>{s.subtitle}</span>
          </button>
        )}
      </div>

      <div className="recommend">
        Para esta pregunta, la lectura propuesta es <b>{spreads.find(s=>s.id===categories[cat].recommended)?.name}</b>.
      </div>
    </section>

    <section>
      <div className="eyebrow">03 · La elección</div>

      <div className="pickTitle">
        <h2>Deja que la pregunta te guíe.</h2>
        <span>{picked.length} / {count}</span>
      </div>

      <p className="hint">La baraja se mezcla automáticamente. Todas las cartas comienzan boca abajo. Elige una carta y se revela para ocupar su posición en la tirada.</p>

      <div className="drawSlots">
        {current.positions.map((position,i)=>
          <div className="drawSlot" key={position}>
            <div className="drawNumber">{String(i+1).padStart(2,"0")}</div>
            <div className="drawPosition">{position}</div>
            <div className="drawCard">
              {selected[i]
                ? <img src={`/cards/${selected[i].file}`} alt={selected[i].name}/>
                : <div className="cardBack"><span>CARTAS</span><b>✦</b></div>
              }
            </div>
          </div>
        )}
      </div>

      <div className="deckLabel">ELIGE UNA CARTA DE LA MESA</div>

      <div className="deck">
        {deckOrder.map(id=>{
          const c=cards.find(card=>card.id===id)!;
          const isPicked=picked.includes(c.id);
          return <button
            className={isPicked?"tarot picked":"tarot"}
            key={c.id}
            onClick={()=>choose(c.id)}
            aria-label={isPicked?c.name:"Carta boca abajo"}
          >
            {isPicked
              ? <img src={`/cards/${c.file}`} alt={c.name}/>
              : <span className="cardBack" aria-hidden="true"><span>CARTAS</span><b>✦</b></span>
            }
            {isPicked&&<span className="cardName">{c.name}</span>}
            {isPicked&&<i>{picked.indexOf(c.id)+1}</i>}
          </button>
        })}
      </div>

      <div className="actions">
        <button className="primary" disabled={picked.length!==count} onClick={interpret}>Revelar interpretación</button>
        <button className="secondary" onClick={random}>Elegir por azar</button>
        <button className="secondary" onClick={resetDeck}>Empezar de nuevo</button>
      </div>
    </section>

    {reading&&
      <section className="result">
        <div className="eyebrow">04 · La lectura</div>
        <h2>Lo que cuenta tu tirada</h2>
        <div className="echo">«{effectiveQuestion}»</div>

        <div className="readingModes">
          {modes.map((m,i)=>
            <button className={mode===i?"mode active":"mode"} onClick={()=>setMode(i)} key={m[0]}>
              <b>{m[0]}</b><span>{m[1]}</span>
            </button>
          )}
        </div>

        <div className="resultCards">
          {selected.map((c,i)=>
            <article key={c.id}>
              <div className="resultImg">
                <img src={`/cards/${c.file}`} alt={c.name}/>
              </div>
              <div className="position">{String(i+1).padStart(2,"0")} · {current.positions[i]}</div>
              <h3>{c.name}</h3>
              <p>{c.essence}</p>
              <details>
                <summary>Profundizar</summary>
                <p><b>Luz:</b> {c.light}. <b>Sombra:</b> {c.shadow}. En esta posición, pregunta qué aporta este arcano a «{effectiveQuestion}» y qué cambia al leerlo junto a las cartas vecinas.</p>
              </details>
            </article>
          )}
        </div>

        <div className="story">
          <div className="label">Narración conjunta · {modes[mode][0]}</div>
          <p>{narrative(selected,current,effectiveQuestion)}</p>
        </div>

        <div className="closing">
          <b>Una última pregunta</b>
          <p>¿Qué parte de esta lectura reconoces en tu realidad y qué parte necesitas comprobar antes de actuar?</p>
        </div>
      </section>
    }

    <footer>
      El tarot se presenta aquí como lenguaje simbólico de reflexión. No determina hechos futuros ni sustituye el criterio personal.
    </footer>
  </main>;
}
