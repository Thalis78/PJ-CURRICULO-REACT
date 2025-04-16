import { useNavigate } from "react-router-dom";

const Curriculum = ({ dadosCurriculo }: any) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/edit", { state: { curriculo: dadosCurriculo } });
    };

    if (!dadosCurriculo) return null;

    const habilidades = dadosCurriculo.secoes.find((sec: any) => sec.tipo === 'habilidades')?.itens || [];
    const certificados = dadosCurriculo.secoes.find((sec: any) => sec.tipo === 'certificados')?.itens || [];
    const experiencias = dadosCurriculo.secoes.find((sec: any) => sec.tipo === 'experiencia')?.itens || [];
    const formacoes = dadosCurriculo.secoes.find((sec: any) => sec.tipo === 'formacao')?.itens || [];

    return (
        <div className="min-h-screen py-6 px-4 sm:px-8">
            <div className="h-10"></div>

            <div className="flex justify-center mb-6">
                <button
                    id="btn-pdf"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    onClick={handleEdit}
                >
                    Editar
                </button>
            </div>

            <div
                id="pdf-content"
                className="bg-white shadow-xl rounded-xl overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row print:max-w-full print:shadow-none print:rounded-none"
            >
                <aside className="bg-blue-600 text-white p-6 md:w-1/3 print:bg-blue-600">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={dadosCurriculo.imagem || 'https://via.placeholder.com/150'}
                            alt="Foto de Perfil"
                            className="w-28 h-28 rounded-full border-4 border-white mb-4 object-cover"
                        />
                        <h1 className="text-xl font-bold text-center">{dadosCurriculo.nome}</h1>
                    </div>

                    <div className="text-sm space-y-4">
                        <div>
                            <h2 className="font-semibold text-lg border-b border-white/30 pb-1 mb-2">Contato</h2>
                            <p>{dadosCurriculo.contato.email}</p>
                            <p>{dadosCurriculo.contato.telefone}</p>
                            <p>{dadosCurriculo.contato.endereco}</p>
                        </div>

                        {habilidades.length > 0 && (
                            <div>
                                <h2 className="font-semibold text-lg border-b border-white/30 pb-1 mb-2">Habilidades</h2>
                                <ul className="list-disc list-inside space-y-1">
                                    {habilidades.map((hab: string, idx: number) => (
                                        <li key={idx}>{hab}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {certificados.length > 0 && (
                            <div>
                                <h2 className="font-semibold text-lg border-b border-white/30 pb-1 mb-2">Certificados</h2>
                                {certificados.map((item: any, idx: number) => (
                                    <p key={idx}>{item.titulo} <span className="block text-xs text-white/80">({item.ano})</span></p>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                <main className="p-6 md:w-2/3 bg-blue-50 text-blue-900 print:bg-white print:text-black">
                    <section className="mb-6">
                        <h2 className="text-2xl font-bold border-b-2 border-blue-300 pb-2 mb-3">Resumo</h2>
                        <p className="text-gray-800">{dadosCurriculo.resumo}</p>
                    </section>

                    {experiencias.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-2xl font-bold border-b-2 border-blue-300 pb-2 mb-3">Experiência Profissional</h2>
                            {experiencias.map((item: any, idx: number) => (
                                <div key={idx} className="mb-4">
                                    <h3 className="text-lg font-semibold">{item.empresa} — {item.cargo}</h3>
                                    <p className="text-sm text-blue-700">{item.periodo}</p>
                                    <p className="text-gray-700">{item.descricao}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {formacoes.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold border-b-2 border-blue-300 pb-2 mb-3">Formação Acadêmica</h2>
                            {formacoes.map((item: any, idx: number) => (
                                <div key={idx} className="mb-3">
                                    <h3 className="text-lg font-semibold">{item.instituicao}</h3>
                                    <p className="text-sm text-blue-700">{item.curso} — {item.anoConclusao}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export { Curriculum };
