let contract = {
  SignedInteger: {
    abi:  [ "function add(int8 _plusOne, int8 _plusTwo) public pure returns (int8)",
            "function sub(int8 _minusOne, int8 _minusTwo) public pure returns (int8)"],
    addr: "",
  },
  UnsignedInteger: {
    abi: [ "function add(uint8 _plusOne, uint8 _plusTwo) public pure returns (uint8)",
           "function sub(uint8 _minusOne, uint8 _minusTwo) public pure returns (uint8)"],
    addr: "",
  },
};

function CalculateSigned() {
  contract.SignedInteger.addr = $("#contractSigned").val();
  if ( checkEthAddr(contract.SignedInteger.addr) ) { 
    document.getElementById('SignedCalculator').style.display = 'inline';
    document.getElementById('contractSignedInput').style.display = 'none';
  }
}

function CalculateUnsigned() {
  contract.UnsignedInteger.addr = $("#contractUnsigned").val();
  if ( checkEthAddr(contract.UnsignedInteger.addr) ) { 
    document.getElementById('UnsignedCalculator').style.display = 'inline';
    document.getElementById('contractUnsignedInput').style.display = 'none';
  }
}

async function addSigned() {
  document.getElementById('addSignedNumberResult').value = "";
  let valueOne = parseInt($("#addSignedNumberOne").val(), 10);
  let valueTwo = parseInt($("#addSignedNumberTwo").val(), 10);
  let result = "";
  if ( checkInputSigned([valueOne, valueTwo]) ){
    result = await calculate(valueOne, valueTwo, "add", "SignedInteger" );
  }
  document.getElementById('addSignedNumberResult').value = result;
}

async function subSigned() {
  document.getElementById('subSignedNumberResult').value = "";
  let valueOne = parseInt($("#subSignedNumberOne").val(), 10);
  let valueTwo = parseInt($("#subSignedNumberTwo").val(), 10);
  let result = "";
  if ( checkInputSigned([valueOne, valueTwo]) ){
    result = await calculate(valueOne, valueTwo, "sub", "SignedInteger" );
  }
  document.getElementById('subSignedNumberResult').value = result;
}

async function addUnsigned() {
  document.getElementById('addUnsignedNumberResult').value = "";
  let valueOne = parseInt($("#addUnsignedNumberOne").val(), 10);
  let valueTwo = parseInt($("#addUnsignedNumberTwo").val(), 10);
  let result = "";
  if ( checkInputUnsigned([valueOne, valueTwo]) ){
    result = await calculate(valueOne, valueTwo, "add", "UnsignedInteger" );
  }
  document.getElementById('addUnsignedNumberResult').value = result;
}

async function subUnsigned() {
  document.getElementById('subUnsignedNumberResult').value = "";
  let valueOne = parseInt($("#subUnsignedNumberOne").val(), 10);
  let valueTwo = parseInt($("#subUnsignedNumberTwo").val(), 10);
  let result = "";
  if ( checkInputUnsigned([valueOne, valueTwo]) ){
    result = await calculate(valueOne, valueTwo, "sub", "UnsignedInteger" );
  }
  document.getElementById('subUnsignedNumberResult').value = result;
}

async function calculate(valueOne, valueTwo, op, contractName ) {
  const provider = new ethers.providers.JsonRpcProvider({url: GANACHE_CONFIG.url}); 
  const signer = provider.getSigner(0);

  const cInstance = new ethers.Contract(contract[contractName].addr, contract[contractName].abi, signer);

  let result;
  switch(op) {
    case 'add':
      result = await cInstance.add(valueOne, valueTwo);
      break;
    case 'sub':
      result = await cInstance.sub(valueOne, valueTwo);
      break;
  } 
  return result;
}

function checkInputSigned(numbers){
  let alert= false;
  const containsOnlyDigits = /^-?[0-9]+$/;
  numbers.forEach( value => {
    if (  value === "" || 
          ! containsOnlyDigits.test(value) ||
          value < -128 ||
          value > 127
    ){
      $('#inputAlert').addClass('in');
      alert = true;
    }
  });
  return ! alert;
}

function checkInputUnsigned(numbers){
  let alert= false;
  const containsOnlyDigits = /^[0-9]+$/;
  numbers.forEach( value => {
    if (  value === "" || 
          ! containsOnlyDigits.test(value) ||
          value < 0 ||
          value > 255
    ){
      $('#inputAlert').addClass('in');
      alert = true;
    }
  });
  return ! alert;
}

function checkEthAddr(addr) {
  const isEthAddr = /^(0x)+[0-9a-f]{40}$/i;
  if ( isEthAddr.test(addr) ) {
    return true;
  }
  return false;
}

$('.close').click(function () {
  $(this).parent().removeClass('in');
});

