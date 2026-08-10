import { add, getAll } from "../services/stats.service.js";

export const addStats = async (req,res) => {
    try {
        const {nome, pontuacao} = req.body

        if(!nome || !pontuacao){
            throw new Error("Campos ausentes na requisição")
        }

        const user  = await add({nome,pontuacao})

        if(!user){
            throw new Error("Erro na inserção dos dados")
        }

        	return res.status(201).json({
			message: "Usuário criado com sucesso!",
	
			user: {
				id: user._id,
				name: user.nome,
				pontuacao: user.pontuacao
			},
		});
    } catch (error) {
        throw error
    }
}

export const getAllStats = async (req, res) => {
  try {
    const response = await getAll(0, 3);

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar estatísticas.",
    });
  }
};

