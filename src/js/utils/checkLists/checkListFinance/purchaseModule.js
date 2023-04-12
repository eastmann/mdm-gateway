export default {

    calcAllPurchase(pModule, pResultRisk) {
        pModule.prepaymentMoreCapital = this.calcPrepaymentMoreCapital(pModule);
        pModule.prepaymentMoreMonthProfit = this.calcPrepaymentMoreMonthProfit(pModule);
        pModule.contractMoreHalfProfit = this.calcContractMoreHalfProfit(pModule);
        pModule.turnoverLess10days = this.calcTurnoverLess10days(pModule);
        pModule.liquidityRatio = this.calcLiquidityRatio(pModule);
        pModule.contractRecomended = this.calcContractRecomended(pModule, pResultRisk);
        pModule.prePaymentRecomended = this.calcPrePaymentRecomended(pModule, pResultRisk);
    },

    //Сумма аванса превышает собственный капитал
    calcPrepaymentMoreCapital(pModule){
        if (pModule.balanceInfo.balance1300 < 0){
            return 'YES'
        }
        let pSumm = pModule.sumPrepayment / pModule.balanceInfo.balance1300;
        return pSumm > 1 ? 'YES' : 'NO';
    },

    //Сумма аванса превышает выручку за месяц
    calcPrepaymentMoreMonthProfit(pModule){
        let pSumm = pModule.sumPrepayment / (pModule.balanceInfo.balance2110 / 12);
        return pSumm > 1 ? 'YES' : 'NO';
    },

    //Сумма договора превышает половину выручки за последний завершенный год
    calcContractMoreHalfProfit(pModule){
        let pSumm = pModule.sumContract / (0.5 * pModule.balanceInfo.balance2110);
        return pSumm > 1 ? 'YES' : 'NO';
    },

    //Период оборачиваемости запасов менее 10 дней (кроме услуг)
    calcTurnoverLess10days(pModule){
        // Math.fround(parseFloat(val.replace(",", ".")))
        let turnover = parseFloat(pModule.balanceInfo.inventoryTurnover.replace(",", "."))
        if (pModule.subjectOfContract !== 'PRODUCT'){
            return 'UNDEFINED'
        }
        return turnover < 10.0 ? 'YES' : 'NO';
    },

    //Коэффициент текущей ликвидности менее 0,9
    calcLiquidityRatio(pModule){
        let liquidityRatio = parseFloat(pModule.balanceInfo.liquidityRatio.replace(",", "."))
        return (liquidityRatio < 0.9) ? 'YES' : 'NO';
    },

    calcContractRecomended(pModule, pResultRisk){
        if ((pResultRisk === 0) || (pResultRisk === 1)){
            return 'NO'
        }

        if (this.calcContractMoreHalfProfit(pModule) === 'YES'){
            return 'NO'
        }

        if ((pModule.subjectOfContract === 'PRODUCT') && (this.calcTurnoverLess10days(pModule) === 'YES')){
            return 'NO'
        }

        return 'YES';
    },

    calcPrePaymentRecomended(pModule, pResultRisk){
        if (this.calcContractRecomended(pModule, pResultRisk) === 'NO'){
            return 'NO'
        }

        if (pResultRisk === 2){
            return 'NO'
        }

        if (this.calcPrepaymentMoreCapital(pModule) === 'YES'){
            return 'NO'
        }

        if (this.calcPrepaymentMoreMonthProfit(pModule) === 'YES'){
            return 'NO'
        }

        if (this.calcContractMoreHalfProfit(pModule) === 'YES'){
            return 'NO'
        }

        return 'YES';
    },
}
