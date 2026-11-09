import { useId } from "react";

/**
 * Авторские сцены к вопросам. Новая картинка — функция в `scenes`
 * с тем же именем, что поле `scene` у вопроса.
 * Людей рисуем силуэтами, без портретов актёров и без кадров сериалов.
 */

const palettes = {
  slovo: {
    night: "#1c2636",
    sky: "#31445f",
    ink: "#140f0c",
    paper: "#f4e7d6",
    brick: "#e15a32",
    lamp: "#f0b429",
    mute: "#7a675c",
    coat: "#9a4034",
    wall: "#3c2c26",
    ground: "#14110e",
    mist: "#243246",
  },
  fisher: {
    night: "#12202b",
    sky: "#1d3a4c",
    ink: "#0c1218",
    paper: "#d7e6e3",
    brick: "#3f8b9c",
    lamp: "#e6d3a4",
    mute: "#617980",
    coat: "#1b5162",
    wall: "#17303c",
    ground: "#0d151b",
    mist: "#234555",
  },
};

function Person({ x, y, fill, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-108" r="15" fill={fill} />
      <path
        fill={fill}
        d="M-18 -90 C-28 -68 -20 -36 -15 -6 L-26 2 H-9 L-4 -18 H4 L9 2 H26 L15 -6 C20 -36 28 -68 18 -90 Z"
      />
    </g>
  );
}

function Lamp({ x, y, c, h = 150 }) {
  return (
    <g>
      <rect x={x} y={y} width="5" height={h} fill={c.ink} />
      <path d={`M${x - 16} ${y + 2} h38 l-7 16 h-24 z`} fill={c.lamp} />
      <circle cx={x + 3} cy={y + 28} r="46" fill={c.lamp} opacity="0.18" />
    </g>
  );
}

function Windows({ x, y, c, rows = 3, cols = 2, lit = true }) {
  const cells = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const on = lit && (row + col) % 2 === 0;
      cells.push(
        <rect
          key={`${x}-${row}-${col}`}
          x={x + col * 24}
          y={y + row * 30}
          width="13"
          height="16"
          rx="1"
          fill={on ? c.lamp : c.paper}
          opacity={on ? 0.95 : 0.14}
        />,
      );
    }
  }
  return <g>{cells}</g>;
}

function Pine({ x, y, c, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <polygon points="0,-132 42,-8 -42,-8" fill={c.ink} />
      <polygon points="0,-86 54,8 -54,8" fill={c.mist} />
      <rect x="-5" y="6" width="10" height="22" fill={c.ink} />
    </g>
  );
}

function Violin({ x, y, c, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3" y="-132" width="6" height="78" fill={c.paper} />
      <ellipse cx="0" cy="-28" rx="18" ry="24" fill={c.paper} />
      <ellipse cx="0" cy="18" rx="26" ry="36" fill={c.paper} />
      <circle cx="0" cy="16" r="5" fill={c.night} />
      <rect x="-8" y="-146" width="16" height="8" rx="2" fill={c.lamp} />
    </g>
  );
}

function Folder({ x, y, c, tilt = -8, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
      <path d="M0 18 H40 L54 0 H112 V86 H0 Z" fill={c.paper} />
      <path d="M12 36 H92 M12 50 H70" stroke={c.mute} strokeWidth="4" fill="none" />
    </g>
  );
}

function sky(c) {
  return <rect width="720" height="320" fill={c.night} />;
}

function ground(c, y = 236) {
  return <rect x="0" y={y} width="720" height={320 - y} fill={c.ground} />;
}

const scenes = {
  pressure(c) {
    return (
      <>
        {sky(c)}
        <rect width="210" height="320" fill={c.ink} />
        <Windows x={36} y={36} c={c} rows={4} cols={3} />
        <circle cx="560" cy="58" r="74" fill={c.lamp} />
        <circle cx="560" cy="78" r="130" fill={c.lamp} opacity="0.14" />
        {ground(c, 248)}
        <path d="M430 248 L590 320 L300 320 Z" fill="#07090c" opacity="0.75" />
        <Person x={78} y={300} fill={c.wall} s={1.15} />
        <Person x={142} y={304} fill={c.mute} s={1.05} />
        <Person x={198} y={302} fill={c.brick} s={0.98} />
        <Person x={470} y={300} fill={c.paper} s={0.92} />
      </>
    );
  },
  word(c) {
    return (
      <>
        <rect width="720" height="320" fill={c.ink} />
        <rect x="70" y="40" width="580" height="240" rx="8" fill={c.wall} />
        <rect x="150" y="78" width="420" height="168" fill={c.paper} />
        <path d="M150 78 H250 L278 108 H570 V246 H150 Z" fill={c.paper} />
        <path d="M188 132 H500 M188 156 H430 M188 180 H470" stroke={c.mute} strokeWidth="4" />
        <circle cx="500" cy="196" r="22" fill={c.brick} />
        <path d="M70 210 C180 250 250 150 360 214" fill="none" stroke={c.lamp} strokeWidth="10" strokeLinecap="round" />
      </>
    );
  },
  company(c) {
    return (
      <>
        {sky(c)}
        <rect x="0" y="40" width="720" height="150" fill={c.wall} />
        <Windows x={48} y={62} c={c} rows={3} cols={4} />
        <Windows x={520} y={62} c={c} rows={3} cols={3} />
        <Lamp x={348} y={70} c={c} h={180} />
        {ground(c, 250)}
        <Person x={230} y={308} fill={c.mute} />
        <Person x={310} y={306} fill={c.paper} s={1.05} />
        <Person x={390} y={308} fill={c.brick} />
        <Person x={470} y={310} fill={c.ink} s={0.96} />
      </>
    );
  },
  turn(c) {
    return (
      <>
        {sky(c)}
        <circle cx="90" cy="70" r="36" fill={c.paper} opacity="0.8" />
        {ground(c, 210)}
        <path d="M360 210 L250 320 L470 320 Z" fill={c.mute} />
        <path d="M250 250 L40 320 H210 Z" fill={c.brick} opacity="0.85" />
        <path d="M470 250 L680 320 H510 Z" fill={c.ink} />
        <rect x="40" y="150" width="90" height="70" fill={c.wall} />
        <Windows x={52} y={162} c={c} rows={2} cols={2} />
        <Person x={360} y={228} fill={c.paper} s={0.78} />
      </>
    );
  },
  lives(c) {
    return (
      <>
        <rect width="360" height="320" fill="#3a2a22" />
        <rect x="360" width="360" height="320" fill={c.night} />
        <rect x="48" y="54" width="250" height="180" rx="6" fill="#5a3d30" />
        <rect x="70" y="150" width="70" height="46" rx="4" fill={c.paper} />
        <rect x="160" y="168" width="46" height="28" rx="3" fill={c.lamp} />
        <circle cx="250" cy="90" r="28" fill={c.lamp} opacity="0.85" />
        <rect x="430" y="70" width="200" height="160" fill={c.ink} />
        <Windows x={452} y={92} c={c} rows={3} cols={3} />
        <Lamp x={400} y={120} c={c} h={120} />
        <rect x="330" y="70" width="28" height="200" fill={c.coat} />
        <path d="M330 78 h28 l8 18 h-44 z" fill={c.brick} />
      </>
    );
  },
  unprotected(c) {
    return (
      <>
        {sky(c)}
        <circle cx="140" cy="78" r="28" fill={c.paper} opacity="0.35" />
        {ground(c, 230)}
        <rect x="250" y="196" width="210" height="16" rx="3" fill={c.mute} />
        <rect x="270" y="160" width="12" height="70" fill={c.mute} />
        <rect x="428" y="160" width="12" height="70" fill={c.mute} />
        <path d="M300 168 h90 l10 28 H292 z" fill={c.coat} />
        <Person x={80} y={300} fill={c.ink} s={0.7} />
        <Person x={130} y={304} fill={c.wall} s={0.66} />
        <Person x={620} y={300} fill={c.ink} s={0.7} />
      </>
    );
  },
  home(c) {
    return (
      <>
        <rect width="720" height="320" fill="#4a342b" />
        <rect x="430" y="36" width="230" height="180" fill={c.night} />
        <Windows x={470} y={64} c={{ ...c, lamp: c.paper }} rows={2} cols={3} lit={false} />
        <rect x="70" y="168" width="280" height="18" fill={c.ink} />
        <rect x="90" y="186" width="14" height="90" fill={c.ink} />
        <rect x="320" y="186" width="14" height="90" fill={c.ink} />
        <rect x="120" y="132" width="54" height="36" rx="4" fill={c.paper} />
        <rect x="190" y="140" width="40" height="28" rx="4" fill={c.lamp} />
        <circle cx="150" cy="70" r="34" fill={c.lamp} />
        <rect x="520" y="150" width="70" height="120" fill={c.coat} />
        <circle cx="555" cy="168" r="16" fill={c.brick} />
      </>
    );
  },
  conflict(c) {
    return (
      <>
        {sky(c)}
        <rect y="150" width="720" height="170" fill={c.ground} />
        <path d="M250 150 H470 L520 320 H200 Z" fill="#1c1814" />
        <Person x={120} y={300} fill={c.brick} s={1.05} />
        <Person x={190} y={306} fill={c.coat} />
        <Person x={500} y={300} fill={c.paper} s={1.05} />
        <Person x={580} y={306} fill={c.mute} />
        <Lamp x={352} y={40} c={c} h={110} />
      </>
    );
  },
  love(c) {
    return (
      <>
        <rect width="720" height="320" fill="#2a211c" />
        <path d="M250 0 H470 V320 H250 Z" fill={c.night} />
        <path d="M300 0 H420 V70 Q360 120 300 70 Z" fill={c.sky} />
        <Violin x={360} y={230} c={c} s={1.15} />
        <Person x={150} y={310} fill={c.paper} s={0.95} />
        <Person x={560} y={310} fill={c.brick} s={0.95} />
      </>
    );
  },
  price(c) {
    return (
      <>
        <rect width="720" height="320" fill={c.night} />
        <rect x="70" y="36" width="300" height="284" fill="#5a3b2e" />
        <circle cx="210" cy="90" r="36" fill={c.lamp} />
        <rect x="110" y="180" width="180" height="14" fill={c.ink} />
        <rect x="250" y="70" width="36" height="210" fill={c.paper} />
        <Person x={470} y={300} fill={c.paper} />
        <path d="M430 300 L560 250" stroke={c.lamp} strokeWidth="3" opacity="0.4" />
      </>
    );
  },
  afterdark(c) {
    return (
      <>
        <rect width="720" height="320" fill="#17141c" />
        <circle cx="360" cy="42" r="16" fill={c.lamp} />
        <path d="M360 58 L392 150 H328 Z" fill={c.lamp} opacity="0.18" />
        <rect x="80" y="250" width="560" height="16" fill={c.mute} />
        <rect x="150" y="210" width="460" height="16" fill={c.wall} />
        <rect x="220" y="170" width="360" height="16" fill={c.mute} />
        <rect x="290" y="130" width="260" height="16" fill={c.wall} />
        <Person x={250} y={248} fill={c.paper} s={0.72} />
      </>
    );
  },
  version(c) {
    return (
      <>
        <rect width="720" height="320" fill="#101820" />
        <rect y="200" width="720" height="120" fill="#1a140f" />
        <circle cx="180" cy="70" r="28" fill={c.lamp} />
        <path d="M150 100 H250 L300 200 H90 Z" fill={c.lamp} opacity="0.16" />
        <Folder x={250} y={150} c={c} tilt={-8} s={1.3} />
        <g opacity="0.45">
          <Folder x={430} y={175} c={{ ...c, paper: c.mute }} tilt={7} s={1.05} />
        </g>
      </>
    );
  },
  unheard(c) {
    return (
      <>
        <rect width="720" height="320" fill={c.night} />
        {ground(c, 240)}
        <rect x="250" y="150" width="150" height="28" rx="10" fill={c.paper} />
        <rect x="392" y="158" width="70" height="12" rx="6" fill={c.paper} />
        <circle cx="286" cy="164" r="6" fill={c.brick} />
        <Person x={120} y={300} fill={c.ink} s={1.2} />
        <Person x={590} y={300} fill={c.ink} s={1.15} />
        <Person x={360} y={292} fill={c.paper} s={0.72} />
      </>
    );
  },
  rules(c) {
    return (
      <>
        <rect width="720" height="320" fill={c.night} />
        {ground(c, 230)}
        <path d="M250 40 L310 290" stroke={c.lamp} strokeWidth="14" />
        <rect x="430" y="70" width="180" height="230" fill={c.ink} />
        <rect x="500" y="150" width="70" height="150" fill={c.sky} />
        <Person x={180} y={300} fill={c.paper} />
      </>
    );
  },
  role(c) {
    return (
      <>
        <rect width="720" height="320" fill="#162028" />
        <rect x="520" y="30" width="140" height="90" fill={c.sky} />
        {ground(c, 250)}
        <rect x="120" y="196" width="90" height="14" fill={c.mute} />
        <rect x="132" y="210" width="10" height="40" fill={c.mute} />
        <rect x="188" y="210" width="10" height="40" fill={c.mute} />
        <rect x="310" y="186" width="100" height="14" fill={c.paper} />
        <rect x="324" y="200" width="10" height="50" fill={c.paper} />
        <rect x="386" y="200" width="10" height="50" fill={c.paper} />
        <rect x="520" y="196" width="90" height="14" fill={c.mute} />
        <rect x="532" y="210" width="10" height="40" fill={c.mute} />
        <rect x="588" y="210" width="10" height="40" fill={c.mute} />
        <Person x={360} y={250} fill={c.brick} s={0.85} />
      </>
    );
  },
  team(c) {
    return (
      <>
        <rect width="720" height="320" fill="#101920" />
        <rect y="188" width="720" height="132" fill="#1b1712" />
        <rect x="150" y="70" width="420" height="150" rx="4" fill={c.paper} />
        <path d="M180 150 C260 90 320 180 400 120 S500 150 540 100" fill="none" stroke={c.brick} strokeWidth="4" />
        <circle cx="300" cy="140" r="8" fill={c.brick} />
        <circle cx="430" cy="118" r="8" fill={c.ink} />
        <Person x={120} y={300} fill={c.mute} s={0.85} />
        <Person x={590} y={300} fill={c.paper} s={0.85} />
        <circle cx="360" cy="48" r="18" fill={c.lamp} />
      </>
    );
  },
  split(c) {
    return (
      <>
        <rect width="360" height="320" fill="#3e322c" />
        <rect x="360" width="360" height="320" fill={c.night} />
        <rect x="348" width="24" height="320" fill={c.lamp} />
        <rect x="60" y="70" width="160" height="120" fill={c.sky} />
        <circle cx="250" cy="210" r="30" fill={c.brick} opacity="0.8" />
        <Folder x={470} y={120} c={c} s={1.2} tilt={-6} />
        <Person x={180} y={310} fill={c.paper} s={0.8} />
      </>
    );
  },
  voice(c) {
    return (
      <>
        <rect width="720" height="320" fill="#1a2428" />
        <circle cx="360" cy="40" r="50" fill={c.lamp} opacity="0.25" />
        {ground(c, 250)}
        <rect x="180" y="200" width="120" height="16" rx="3" fill={c.paper} transform="rotate(-8 240 208)" />
        <rect x="420" y="200" width="120" height="16" rx="3" fill={c.paper} transform="rotate(8 480 208)" />
        <rect x="330" y="214" width="28" height="22" rx="4" fill={c.lamp} />
        <Person x={230} y={300} fill={c.mute} s={0.9} />
        <Person x={490} y={300} fill={c.brick} s={0.9} />
      </>
    );
  },
  victory(c) {
    return (
      <>
        <rect width="720" height="320" fill="#24343a" />
        <circle cx="560" cy="60" r="70" fill={c.paper} opacity="0.35" />
        <rect x="80" y="40" width="200" height="240" fill={c.sky} opacity="0.45" />
        <Folder x={300} y={120} c={c} tilt={0} s={1.45} />
        <path d="M340 150 H470" stroke={c.brick} strokeWidth="5" />
      </>
    );
  },
  steady(c) {
    return (
      <>
        {sky(c)}
        <rect x="80" y="40" width="260" height="200" fill={c.ink} />
        <rect x="150" y="80" width="120" height="90" fill={c.lamp} />
        {ground(c, 240)}
        <Person x={470} y={305} fill={c.paper} />
        <path d="M430 240 H560" stroke={c.mute} strokeWidth="4" />
      </>
    );
  },
  leaving(c) {
    return (
      <>
        {sky(c)}
        <circle cx="120" cy="80" r="40" fill={c.paper} opacity="0.25" />
        <Pine x={520} y={250} c={c} s={1.15} />
        <Pine x={620} y={265} c={c} s={0.9} />
        <Pine x={450} y={270} c={c} s={0.75} />
        {ground(c, 250)}
        <path d="M0 280 H260 L300 250 H0 Z" fill={c.mist} />
        <rect x="180" y="210" width="36" height="28" fill={c.paper} />
        <Person x={300} y={292} fill={c.paper} s={0.62} />
      </>
    );
  },
  onemove(c) {
    return (
      <>
        <rect width="720" height="320" fill="#0c1014" />
        <circle cx="360" cy="0" r="180" fill={c.lamp} opacity="0.16" />
        <rect x="250" y="78" width="220" height="160" fill={c.paper} />
        <circle cx="360" cy="150" r="36" fill={c.brick} opacity="0.85" />
        <rect x="300" y="250" width="120" height="10" fill={c.mute} />
      </>
    );
  },
  yard(c) {
    return (
      <>
        {sky(c)}
        <rect x="0" y="70" width="180" height="250" fill={c.wall} />
        <rect x="540" y="40" width="180" height="280" fill={c.ink} />
        <Windows x={28} y={96} c={c} rows={4} cols={3} />
        <Windows x={570} y={70} c={c} rows={5} cols={3} />
        <Lamp x={300} y={80} c={c} h={160} />
        {ground(c, 236)}
        <circle cx="500" cy="280" r="54" fill={c.mute} opacity="0.55" />
        <Person x={250} y={292} fill={c.paper} s={1.15} />
        <Person x={400} y={300} fill={c.brick} s={0.95} />
      </>
    );
  },
  fog(c) {
    return (
      <>
        <rect width="720" height="320" fill={c.sky} />
        <Pine x={140} y={250} c={c} s={1.2} />
        <Pine x={250} y={270} c={{ ...c, ink: c.mist }} s={1} />
        <Pine x={430} y={255} c={c} s={1.35} />
        <Pine x={580} y={275} c={{ ...c, ink: c.mist }} s={0.95} />
        <rect y="250" width="720" height="70" fill={c.paper} opacity="0.18" />
        <path d="M0 290 H720" stroke={c.paper} strokeWidth="3" opacity="0.35" />
      </>
    );
  },
};

export function QuestionArt({ scene, theme = "slovo", grain = true }) {
  const rawId = useId().replace(/:/g, "");
  const palette = palettes[theme] || palettes.slovo;
  const draw = scenes[scene] || scenes.yard;

  return (
    <svg className="art" viewBox="0 0 720 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {grain ? (
        <defs>
          <filter id={`grain-${rawId}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      ) : null}
      {draw(palette)}
      {grain ? (
        <rect width="720" height="320" filter={`url(#grain-${rawId})`} opacity="0.16" style={{ mixBlendMode: "overlay" }} />
      ) : null}
    </svg>
  );
}
