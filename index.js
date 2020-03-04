// BASE A SER UTILIZADA
const alunosDaEscola = [
  {
    nome: "Henrique Gomes",
    notas: [],
    cursos: [],
    faltas: 5
  },
  {
    nome: "Edson Peres",
    notas: [],
    cursos: [],
    faltas: 2
  },
  {
    nome: "Bruno Oliveira",
    notas: [10, 9.8, 9.6],
    cursos: [],
    faltas: 0
  },
  {
    nome: "Guilherme Silva",
    notas: [10, 9.8, 9.6],
    cursos: [
      {
        nomeDoCurso: "Full Stack",
        dataMatricula: new Date()
      }
    ],
    faltas: 0
  },
  {
    nome: "Carlos Alberto",
    notas: [],
    cursos: [],
    faltas: 0
  },
  {
    nome: "Lucca Gianni",
    notas: [10, 9.8, 9.6],
    cursos: [
      {
        nomeDoCurso: "UX",
        dataMatricula: new Date()
      }
    ],
    faltas: 0
  }
];

// ADICIONAR ALUNO
const adicionarAluno = nomeAluno => {
  const TAMANHO_MINIMO = 7;
  let mensagemSucesso = `O aluno "${nomeAluno}" foi cadastrado com sucesso em nosso banco de dados.`;
  let mensagemFalha = `O nome "${nomeAluno}" não atende ao requisito mínimo de ${TAMANHO_MINIMO} caracteres. Favor informar um nome válido.`;

  if (nomeAluno.length >= TAMANHO_MINIMO) {
    alunosDaEscola.push({
      nome: nomeAluno,
      notas: [],
      cursos: [],
      faltas: 0
    });
    return mensagemSucesso;
  } else {
    return mensagemFalha;
  }
};

// LISTAR ALUNOS
const listarAlunos = () => {
  for (let aluno in alunosDaEscola) {
    console.log(alunosDaEscola[aluno].nome);
  }
};

// BUSCAR ALUNO
const buscarAluno = nomeAluno => {
  for (let i = 0; i < alunosDaEscola.length; i++) {
    if (alunosDaEscola[i].nome.indexOf(nomeAluno) >= 0) {
      return alunosDaEscola[i];
    }
  }
};

// MATRICULAR ALUNO
const matricularAluno = (nomeAluno, curso) => {
  let pos = 0;
  let resultadoCadastro = [];

  for (let i = 0; i < alunosDaEscola.length; i++) {
    pos = i;
    if (alunosDaEscola[i].nome == nomeAluno) {
      alunosDaEscola[i].cursos.push({
        nomeDoCurso: curso,
        dataMatricula: new Date()
      });
      resultadoCadastro = alunosDaEscola[pos];
      break;
    }
  }
  return resultadoCadastro;
};

// APLICAR FALTA
const aplicarFalta = nomeAluno => {
  let pos = 0;
  let resultadoCadastro = [];
  for (let i = 0; i < alunosDaEscola.length; i++) {
    pos = i;
    if (alunosDaEscola[i].nome == nomeAluno) {
      alunosDaEscola[i].faltas += 1;
      resultadoCadastro = alunosDaEscola[pos];
      break;
    } else {
      resultadoCadastro = `Aluno "${nomeAluno}" não localizado. Favor informar um nome válido.`;
    }
  }
  return resultadoCadastro;
};

// APLICAR NOTA
const aplicarNota = (nomeAluno, nota) => {
  let pos = 0;
  let resultadoCadastro = [];
  let validacaoMatricula;
  let alunoNaoMatriculado = `O aluno "${nomeAluno}" não está matriculado em 
    nenhum curso atualmente.`;
  let alunoNaoLocalizado = `Aluno "${nomeAluno}" não localizado. Favor informar 
    um nome válido.`;

  for (let i = 0; i < alunosDaEscola.length; i++) {
    pos = i;
    if (alunosDaEscola[i].nome == nomeAluno) {
      validacaoMatricula = alunosDaEscola[i].cursos.length;
      if (validacaoMatricula > 0) {
        alunosDaEscola[i].notas.push(nota);
        resultadoCadastro = alunosDaEscola[pos];
        break;
      } else {
        resultadoCadastro = alunoNaoMatriculado;
        break;
      }
    } else if (alunosDaEscola[i].nome != nomeAluno) {
      resultadoCadastro = alunoNaoLocalizado;
    }
  }
  return resultadoCadastro;
};

// APROVAR ALUNO
const aprovarAluno = nomeAluno => {
  let media;
  let qtdNotas;
  let validacaoMatricula;
  let qtdMinNotas = 3;
  let aprovado = `Aluno: ${nomeAluno}\nResultado: Aprovado\nMédia:`;
  let reprovado = `Aluno: ${nomeAluno}\nResultado: Reprovado\nMédia:`;

  if (alunosDaEscola.filter(el => el.nome == nomeAluno) == 0) {
    console.log(
      `Aluno "${nomeAluno}" não localizado. Favor informar um nome válido.`
    );
  } else {
    for (let i = 0; i < alunosDaEscola.length; i++) {
      if (alunosDaEscola[i].nome == nomeAluno) {
        qtdNotas = alunosDaEscola[i].notas.length;
        media =
          alunosDaEscola[i].notas.reduce((acum, el) => {
            return acum + el;
          }) / qtdNotas;
        validacaoMatricula = alunosDaEscola[i].cursos.length;
        if (
          qtdNotas >= qtdMinNotas &&
          alunosDaEscola[i].faltas <= 3 &&
          validacaoMatricula > 0
        ) {
          if (media >= 7) {
            console.log(`${aprovado} ${Math.round(media * 100) / 100}\n`);
          } else if (media < 7) {
            console.log(`${reprovado} ${Math.round(media * 100) / 100}\n`);
          }
          break;
        } else if (
          qtdNotas >= qtdMinNotas &&
          alunosDaEscola[i].faltas <= 3 &&
          validacaoMatricula == 0
        ) {
          console.log(
            `O aluno ${nomeAluno} não está matrículado em nenhum curso.`
          );
          break;
        }
      }
    }
  }
};

// TESTANDO AS FUNÇÕES
adicionarAluno("Lucas Almeida");
adicionarAluno("Roberto Padilha");
listarAlunos();
buscarAluno("Lucas Almeida");
matricularAluno("Lucas Almeida", "Full Stack");
matricularAluno("Lucas Almeida", "Maratona Data Science");
matricularAluno("Roberto Padilha", "ETL");
aplicarFalta("Lucas Almeida");
aplicarNota("Lucas Almeida", 9.5);
aplicarNota("Lucas Almeida", 9.8);
aplicarNota("Lucas Almeida", 10);
aplicarNota("Roberto Padilha", 5);
aplicarNota("Roberto Padilha", 8);
aplicarNota("Roberto Padilha", 1);
aprovarAluno("Lucas Almeida");
aprovarAluno("Guilherme Silva");
aprovarAluno("Robersto Padilha");
