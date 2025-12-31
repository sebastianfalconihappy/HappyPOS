export default function ExtraOptions() {
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10">
      <div className="grid grid-cols-2 gap-3">
        {/* GARANTÍA */}
        <div>
          <label className="block text-xs font-medium mb-1">
            Garantía
          </label>
          <select className="w-full px-2 py-1.5 text-sm rounded-md bg-slate-100 dark:bg-[#1B2333] border border-slate-300 dark:border-white/10">
            <option>ASISTENCIA PLUS</option>
            <option>NO APLICA</option>
          </select>
        </div>

        {/* CANAL */}
        <div>
          <label className="block text-xs font-medium mb-1">
            Canal
          </label>
          <select className="w-full px-2 py-1.5 text-sm rounded-md bg-slate-100 dark:bg-[#1B2333] border border-slate-300 dark:border-white/10">
            <option>Referidos</option>
            <option>Segunda Compras</option>
            <option>Redes Sociales</option>
            <option>Tráfico Normal</option>
            <option>Mensajería</option>
            <option>Volanteo</option>
            <option>Recover</option>
            <option>Ruta Propia</option>
            <option>CRM</option>
            <option>Pichincha Mi Vecino</option>
            <option>Pauta Empresa</option>
          </select>
        </div>
      </div>
    </div>
  );
}
