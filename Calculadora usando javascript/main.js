
function Calc () {
    this.memory='';
    this.entry= new Array();
    this.operation= new Array();
    this.result=0;
    this.haveAPoint = false;
    this.ans=0;

    // função para pegar gatilhos do teclado
    this.getEntryFromKeyboard = (entry) => {
        
        //Aqui é verificado se o usuário que apagar o ultimo elemento 
        if(entry.key=='d'){
            this.memory = this.memory.substring(0,this.memory.length-1);
            if(!this.memory.length){
                this.changeEcranFontSize('');
                this.putOnEcran(0);   
            }else{
                this.changeEcranFontSize(this.memory);
                this.putOnEcran(this.memory);
            }
        }else if(this.isAValidKey(entry.key)){
            this.guardarEntrada(entry.key);
        }

    }


    // Método onde a o core da aplicação é rodado
    this.guardarEntrada = (entry) => {

        // primeiro é verificado se a entrada já não tem o valor máximo
        if(this.memory.length<28)
            // Assim é adicionado a entrada como uma string
            this.memory+=entry;

        //aqui é mudado o tamanho da fonte para 
        // o valor da memória não passar do tamanho do ecran
        this.changeEcranFontSize(this.memory);

        // Aqui é colocado a memória no ecran para que 
        // o usuário veja o que ele está fazendo
        this.putOnEcran(this.memory);
        

        // Aqui é verificado se o usuário apertou a tecla C
        // caso confirmado, ele limpa todas as variáveis da classe
        // menos a variável ans, que guarda o último resultado
        if(entry=='c'){
            this.memory = '';
            this.entry=[];
            this.operation=[];
            this.result=0;
            this.clearEcran();
            this.resetFontSize();
        }

        //rezetta o ans também
        if(entry=='ac'){
            this.memory = '';
            this.entry=[];
            this.operation=[];
            this.ans=0;
            this.result=0;
            this.clearEcran();
            this.resetFontSize();
        }

        // Aaqui é verificado se o usuário apertou o botão =
        // caso confirmado, são executadas as tarefas que 
        // vão executar a conta
        if(entry == '='){            
            // coloca uma variável temporária para
            // armazenar os valores da mamória
            // para que o método seguinte funcione
            let temp = this.memory.split('');
            this.getEntrysFromString(temp);

            // aqui se chama o método que calcula o resultado
            this.getFinalResult();

            // aqui coloca o resultado no ecran
            this.putOnEcran(this.result);

            // novamente atento ao tamanho da fonte
            this.changeEcranFontSize(this.result);

            // aqui guardamos o ans e rezetamos os outros valores
            this.ans = this.result;
            this.memory = '';  
            this.entry = [];
            this.operation = [];
            this.result=0;
        }

    }

    // Método que retorna true se o valor de entrada entry
    // não for nenhuma das operações da calculadora
    this.dontFindOperator = (entry) => {
        switch(entry){
            case '+':
                return false
                break;
            case '/':
                return false
                break;
            case '-':
                return false
                break;
            case 'x':
                return false
                break;
            case '%':
                return false
                break;
            case 's':
                return false
                break;
            case 'e':
                return false
                break;
            case '=':
                return false
                break;
            default:
                return true;
                break;
        }
    }

    // Esse método coloca a entrada nas variáveis da classe 
    // para que sejam processadas posteriormente
    this.getEntrysFromString = (entry) => {
        let holder = '';

        // Primeiramente é feito um for do tamanho do vetor
        // para percorrer o vetor
        for (let i = 0; i < entry.length; i++) {

            // aqui é feita a verificação para saber se uma das
            // ou ambas as entradas contém ponto flutuante
            if(entry[i]=='.')
                this.haveAPoint = true;

            //aqui é verificado se a posição atual do vetor é algum operador
            //caso seja, armazeno na variável operador e acrescento um contador 
            //para saber se é a primeira ou a segunda variável a ser settada
            if(this.dontFindOperator(entry[i])){
                if(!entry[i].includes('=')){
                    holder+=entry[i];
                }
            }else if(!this.dontFindOperator(entry[i])){

                // aqui é verificado se a variavel de ponto flutuante está settada
                // caso esteja,as variáveis são convertidas float, caso contrário,
                // são convetidas para Int
                if(this.haveAPoint){
                    holder = parseFloat(holder);
                }else{
                    holder = parseInt(holder);
                }

                // verifica se é necessário usar o ans
                if(!holder)
                    holder = this.ans;

                // coloca os elementos no final de suas filas
                this.entry.push(holder);
                this.operation.push(entry[i]);

                // rezetta a variável responsável por segurar a entrada
                holder = '';
            }

        }

    }

    // Método que calcula o resultado desejado baseado na Operação
    // settada no método que pega a string e transforma o método em variáveis 
    this.calculateResult = (operator, value1, value2) => {
        switch(operator){
            case '+':
                this.result = value1 + value2;
                break;
            case '/':
                this.result = value1 / value2;
                break;
            case '-':
                this.result = value1 - value2;
                break;
            case 'x':
                this.result = value1 * value2;
                break;
            case '%':
                this.result = value1 * value2 / 100;
                break;
            case 's':
                this.result = value1 ** 0.5;
                break;
            case 'e':
                this.result = value1 ** value2;
                break;
            default:
                this.result = 'erro';
                break;
        }
    }

    // calcula o resultado para cada operação na fila!
    this.getFinalResult = () => {
        let index = 0;
        let counter = 0; 

        while(this.operation[index]!='='){
            if(!counter){
                this.calculateResult(this.operation[index],this.entry.shift(),this.entry.shift());
                this.ans = this.result;
            }else{
                this.calculateResult(this.operation[index],this.ans,this.entry.shift());
                this.ans = this.result;
            }
            index++;
            counter++;
        }
    }

    // Método que modifica o tamanho da fonte do ecrã de acordo com o tamanho do valor passado
    this.changeEcranFontSize = (valueThatIWantToVerify) => {

        //transformando meu método em uma string para conseguir o atribute length
        valueThatIWantToVerify = `${valueThatIWantToVerify}`;

        // Fazendo os if's que vão verificar o tamanho da string 
        // para deixar o tamanho da fonte compatível com o Ecran
        if(valueThatIWantToVerify.length<9)
            this.setFontSize("50px");

        if(valueThatIWantToVerify.length>9)
            this.setFontSize("40px");

        if(valueThatIWantToVerify.length>11)
            this.setFontSize("30px");

        if(valueThatIWantToVerify.length>15)
            this.setFontSize("20px");

        if(valueThatIWantToVerify.length>23)
            this.setFontSize("15px");

    }

    this.isAValidKey = (value) => {
        let acceptable = ['c','d','1','2','3','4','5','6','7','8','9','0','=','e','%','+','-','/','x','s','.'];

        let filtred = acceptable.filter((element)=>{if(value==element)return value;else return;});

        if(!this.dontFindOperator() || filtred.length){
            return true;
        }
        return false;
    }

    // ----------- Métodos que modificam o html e o css ------------
    
    // Método que zera o ecran
    this.clearEcran = () => {
        document.getElementById("ecran_text").innerHTML = 0;
    }

    // Método que coloca no html do ecran o valor passado para ele
    this.putOnEcran = (whatIWantToShow = null) => {
        if(whatIWantToShow!=null)
            document.getElementById("ecran_text").innerHTML = whatIWantToShow;
    }

    // Rezeta o tamanho da fonte do ecran da calculadora
    this.resetFontSize = () => {
        document.getElementById("ecran_text").style.fontSize = "50px";
    }

    // Setta o tamanho da fonte do ecran da calculadora de acordo com o parametro size
    this.setFontSize = (size) => {
        if(size!=null)
            document.getElementById("ecran_text").style.fontSize = size;
    }
}
