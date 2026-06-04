import { create } from "zustand";

export interface LogEntry {
	id: number;
	time: string;
	message: string;
}

interface PlaygroundState {
	log: LogEntry[];
	addLog: (message: string) => void;
	clearLog: () => void;
}

let counter = 0;

/**
 * Store di stato per la demo (playground).
 *
 * Nota: Zustand vive SOLO nella demo, non nella libreria pubblicata.
 * Dimostra come il componente si integri con uno state manager esterno
 * pur restando esso stesso a stato locale e zero-dependency.
 */
export const usePlaygroundStore = create<PlaygroundState>((set) => ({
	log: [],
	addLog: (message) =>
		set((state) => ({
			log: [
				{
					id: counter++,
					time: new Date().toLocaleTimeString(),
					message,
				},
				...state.log,
			],
		})),
	clearLog: () => set({ log: [] }),
}));
