import { useRef, useState } from "react";
import DropdownMultilevel, { type DropdownHandle } from "@root/src";

/**
 * Pagina di test manuale.
 * Avvia con: npm run dev
 * Apri: http://localhost:5173
 */
export default function DropdownPlayground() {
    const ref = useRef<DropdownHandle>(null);
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) =>
        setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

    return (
        <div style={{ padding: 40, fontFamily: "sans-serif" }} className={"overflow-auto h-screen w-screen text-center items-center justify-center place-items-center"}>
            <h1>Dropdown — Test Manuale</h1>

            {/* ── Log eventi ──────────────────────────────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>Log eventi</h2>
                <div style={{
                    background: "#1e1e1e", color: "#00ff00",
                    padding: 12, borderRadius: 8,
                    height: 120, overflowY: "auto",
                    fontFamily: "monospace", fontSize: 13,
                }}>
                    {log.length === 0
                        ? <span style={{ color: "#666" }}>Nessun evento ancora...</span>
                        : log.map((l, i) => <div key={i}>{l}</div>)
                    }
                </div>
                <button
                    onClick={() => setLog([])}
                    style={{ marginTop: 8 }}
                >
                    Pulisci log
                </button>
            </section>

            {/* ── Caso 1: Base ─────────────────────────────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>✅ Caso 1 — Base</h2>
                <p>Clicca il bottone → il menu deve aprirsi e chiudersi</p>
                <DropdownMultilevel
                    title="Menu Base"
                    onOpen={() => addLog("Caso 1 → onOpen")}
                    onClose={() => addLog("Caso 1 → onClose")}
                >
                    <DropdownMultilevel.Item onClick={() => addLog("Caso 1 → Voce 1")}>
                        Voce 1
                    </DropdownMultilevel.Item>
                    <DropdownMultilevel.Item onClick={() => addLog("Caso 1 → Voce 2")}>
                        Voce 2
                    </DropdownMultilevel.Item>
                    <DropdownMultilevel.Divider />
                    <DropdownMultilevel.Item onClick={() => addLog("Caso 1 → Voce 3")}>
                        Voce 3
                    </DropdownMultilevel.Item>
                </DropdownMultilevel>
            </section>

            {/* ── Caso 2: Disabilitato ─────────────────────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>🚫 Caso 2 — Disabilitato</h2>
                <p>Il bottone deve essere grigio e non aprire il menu</p>
                <DropdownMultilevel
                    title="Menu Disabilitato"
                    isDisabled
                    onOpen={() => addLog("Caso 2 → NON doveva aprirsi!")}
                >
                    <DropdownMultilevel.Item>Voce 1</DropdownMultilevel.Item>
                </DropdownMultilevel>
            </section>

            {/* ── Caso 3: Hover ────────────────────────────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>🖱️ Caso 3 — Apertura su Hover</h2>
                <p>Passa il mouse sul bottone → il menu deve aprirsi</p>
                <p>Allontana il mouse → il menu deve chiudersi dopo 300ms</p>
                <DropdownMultilevel
                    title="Menu Hover"
                    openOnHover
                    hoverCloseDelay={300}
                    onOpen={() => addLog("Caso 3 → onOpen")}
                    onClose={() => addLog("Caso 3 → onClose")}
                >
                    <DropdownMultilevel.Item>Voce 1</DropdownMultilevel.Item>
                    <DropdownMultilevel.Item>Voce 2</DropdownMultilevel.Item>
                </DropdownMultilevel>
            </section>

            {/* ── Caso 4: Posizioni ────────────────────────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>📐 Caso 4 — Posizioni del menu</h2>
                <p>Il menu deve aprirsi nella posizione corretta</p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {(["left", "right", "top-left", "top-right"] as const).map((pos) => (
                        <DropdownMultilevel
                            key={pos}
                            title={`Position: ${pos}`}
                            position={pos}
                        >
                            <DropdownMultilevel.Item>Voce 1</DropdownMultilevel.Item>
                            <DropdownMultilevel.Item>Voce 2</DropdownMultilevel.Item>
                        </DropdownMultilevel>
                    ))}
                </div>
            </section>

            {/* ── Caso 5: Varianti bottone ─────────────────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>🎨 Caso 5 — Varianti bottone</h2>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {(["primary", "secondary", "tertiary", "special", "dashed"] as const).map((v) => (
                        <DropdownMultilevel key={v} title={v} buttonVariant={v}>
                            <DropdownMultilevel.Item>Voce 1</DropdownMultilevel.Item>
                        </DropdownMultilevel>
                    ))}
                </div>
            </section>

            {/* ── Caso 6: SubMenu ──────────────────────────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>📂 Caso 6 — SubMenu annidato</h2>
                <p>Passa il mouse su "Altre opzioni" → deve aprirsi il sottomenu a destra</p>

                <DropdownMultilevel title="Menu con SubMenu">

                    <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Voce 1")}>
                        Voce 1
                    </DropdownMultilevel.Item>

                    <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Voce 2")}>
                        Voce 2
                    </DropdownMultilevel.Item>

                    <DropdownMultilevel.Divider />
                    <DropdownMultilevel.SubMenu
                        title="Altre opzioni"
                        position="right"
                        label="Sottomenu opzioni"
                    >
                        <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 1")}>
                            Sub Voce 1
                        </DropdownMultilevel.Item>
                        <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 2")}>
                            Sub Voce 2
                        </DropdownMultilevel.Item>
                        <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 3")}>
                            Sub Voce 3
                        </DropdownMultilevel.Item>
                    </DropdownMultilevel.SubMenu>
                    {/* ← title è il trigger visibile */}
                    <DropdownMultilevel.SubMenu
                        title="Altre opzioni piu livelli"
                        position="right"
                        label="Sottomenu opzioni"
                    >
                        <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 1")}>
                            Sub Voce 1
                        </DropdownMultilevel.Item>
                        <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 2")}>
                            Sub Voce 2
                        </DropdownMultilevel.Item>
                        <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 3")}>
                            Sub Voce 3
                        </DropdownMultilevel.Item>

                        <DropdownMultilevel.SubMenu
                            title="Altre opzioni"
                            position="right-top"
                            label="Sottomenu opzioni"
                        >
                            <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 1")}>
                                Sub Voce 1
                            </DropdownMultilevel.Item>
                            <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 2")}>
                                Sub Voce 2
                            </DropdownMultilevel.Item>
                            <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 3")}>
                                Sub Voce 3
                            </DropdownMultilevel.Item>
                            <DropdownMultilevel.SubMenu
                                title="Altre opzioni"
                                position="right-top"
                                label="Sottomenu opzioni"
                            >
                                <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 1")}>
                                    Sub Voce 1
                                </DropdownMultilevel.Item>
                                <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 2")}>
                                    Sub Voce 2
                                </DropdownMultilevel.Item>
                                <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 3")}>
                                    Sub Voce 3
                                </DropdownMultilevel.Item>
                                <DropdownMultilevel.SubMenu
                                    title="Altre opzioni"
                                    position="right-top"
                                    label="Sottomenu opzioni"
                                >
                                    <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 1")}>
                                        Sub Voce 1
                                    </DropdownMultilevel.Item>
                                    <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 2")}>
                                        Sub Voce 2
                                    </DropdownMultilevel.Item>
                                    <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 3")}>
                                        Sub Voce 3
                                    </DropdownMultilevel.Item>
                                    <DropdownMultilevel.SubMenu
                                        title="Altre opzioni"
                                        position="right-top"
                                        label="Sottomenu opzioni"
                                    >
                                        <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 1")}>
                                            Sub Voce 1
                                        </DropdownMultilevel.Item>
                                        <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 2")}>
                                            Sub Voce 2
                                        </DropdownMultilevel.Item>
                                        <DropdownMultilevel.Item onClick={() => addLog("Caso 6 → Sub 3")}>
                                            Sub Voce 3
                                        </DropdownMultilevel.Item>
                                    </DropdownMultilevel.SubMenu>
                                </DropdownMultilevel.SubMenu>
                            </DropdownMultilevel.SubMenu>
                        </DropdownMultilevel.SubMenu>
                    </DropdownMultilevel.SubMenu>

                </DropdownMultilevel>
            </section>

            {/* ── Caso 6b: SubMenu annidato a sinistra ─────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>📂 Caso 6b — SubMenu a sinistra</h2>

                <DropdownMultilevel title="Menu SubMenu Left" position="right">

                    <DropdownMultilevel.SubMenu
                        title="Apri a sinistra"
                        position="left"
                    >
                        <DropdownMultilevel.Item onClick={() => addLog("6b → Sub 1")}>
                            Sub Voce 1
                        </DropdownMultilevel.Item>
                        <DropdownMultilevel.Item onClick={() => addLog("6b → Sub 2")}>
                            Sub Voce 2
                        </DropdownMultilevel.Item>
                    </DropdownMultilevel.SubMenu>

                </DropdownMultilevel>
            </section>

            {/* ── Caso 7: forwardRef imperativo ────────────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>🔧 Caso 7 — Controllo imperativo (forwardRef)</h2>
                <p>Usa i bottoni sotto per controllare il dropdown da fuori</p>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <button onClick={() => {
                        addLog(`Caso 7 → isOpen = ${ref.current?.isOpen}`);
                    }}>
                        Leggi isOpen
                    </button>
                    <button onClick={() => {
                        ref.current?.toggle(
                            new MouseEvent("click") as unknown as React.MouseEvent<HTMLButtonElement>
                        );
                        addLog("Caso 7 → toggle chiamato");
                    }}>
                        Toggle dal padre
                    </button>
                </div>
                <DropdownMultilevel
                    ref={ref}
                    title="Menu con Ref"
                    onOpen={() => addLog("Caso 7 → onOpen")}
                    onClose={() => addLog("Caso 7 → onClose")}
                >
                    <DropdownMultilevel.Item>Voce 1</DropdownMultilevel.Item>
                </DropdownMultilevel>
            </section>

            {/* ── Caso 8: Item con icona ───────────────────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>🖼️ Caso 8 — Item con icona</h2>
                <DropdownMultilevel title="Menu con icone">
                    <DropdownMultilevel.Item
                        icon={<span>⚙️</span>}
                        onClick={() => addLog("Caso 8 → Impostazioni")}
                    >
                        Impostazioni
                    </DropdownMultilevel.Item>
                    <DropdownMultilevel.Item
                        icon={<span>🗑️</span>}
                        onClick={() => addLog("Caso 8 → Elimina")}
                    >
                        Elimina
                    </DropdownMultilevel.Item>
                    <DropdownMultilevel.Item
                        icon={<span>🔒</span>}
                        isDisabled
                    >
                        Bloccato
                    </DropdownMultilevel.Item>
                </DropdownMultilevel>
            </section>

            {/* ── Caso 9: Click esterno ────────────────────────────── */}
            <section style={{ marginBottom: 40 }}>
                <h2>👆 Caso 9 — Click esterno</h2>
                <p>Apri il menu → clicca fuori → il menu deve chiudersi</p>
                <DropdownMultilevel
                    title="Click esterno ON"
                    disableOutsideClick
                    onClose={() => addLog("Caso 9a → chiuso da click esterno")}
                >
                    <DropdownMultilevel.Item>Voce 1</DropdownMultilevel.Item>
                </DropdownMultilevel>
                <br />
                <DropdownMultilevel
                    title="Click esterno OFF"
                    disableOutsideClick={false}
                    onClose={() => addLog("Caso 9b → chiuso")}
                >
                    <DropdownMultilevel.Item>Voce 1</DropdownMultilevel.Item>
                </DropdownMultilevel>
            </section>
        </div>
    );
}

