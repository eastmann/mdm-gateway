export default {
    getFullNameByDictiName(checkList, dictiName) {
        if ((checkList === null) || (checkList.checkListParam === null)){
            return "--";
        }
        let i = 0;
        for (var index = 0; index < checkList.checkListParam.length; index++) {
            if (checkList.checkListParam[index].dicti.constName === dictiName) {
                return checkList.checkListParam[index].dicti.fullName;
            }
            i++;
        }
        return "--";
    },

    getIdByDictiName(checkList, dictiName) {
        let i = 0;
        for (var index = 0; index < checkList.checkListParam.length; index++) {
            if (checkList.checkListParam[index].dicti.constName === dictiName) {
                return i
            }
            i++;
        }
        return -1;
    },

    salesChannelShortName(checkList) {
        if (checkList.salesChannel !== null) {
            return checkList.salesChannel.shortName;
        }
        return "";
    },

    yesNoRus(yesNo) {
        if ((yesNo == null) || (yesNo === '') || (yesNo === 'UNDEFINED'))
            return 'Нет';
        if (yesNo === 'NO')
            return 'Нет';
        if (yesNo === 'YES')
            return 'Да';
        return 'Нет';
    },

    isYesParam(param) {
        return this.yesNoRus(param.checked) === 'Да';
    },

    isEmpty(val) {
        if ((val == null) || (val === '') || (val === 'UNDEFINED')) {
            return 0;
        }
        return val;
    },

    calcRating(checkList) {
        var rating = 0;
        if (checkList.checkListParam === null) return rating;
        for (var index = 0; index < checkList.checkListParam.length; index++) {
            if (this.isYesParam(checkList.checkListParam[index])
                && (this.isEmpty(checkList.checkListParam[index].valueStr) === 'R')) {
                return 'R';
            }

            if (this.isYesParam(checkList.checkListParam[index])) {
                rating += Number(this.isEmpty(checkList.checkListParam[index].valueStr));
            }
        }
        return rating;
    },

    recommendedDecisionFullName(checkList) {
        if (checkList.recommendedDecision === null) {
            return "";
        }
        if (checkList.recommendedDecision.fullName === "Авансовая") {
            return "Аванс или отказ (в случае если у услуги нет авансовой системы расчета)";
        }
        return checkList.recommendedDecision.fullName;
    },

    checkResultShortName(checkList) {
        if (checkList.checkResult !== null) {
            return checkList.checkResult.shortName;
        }
        return "";
    },

    recommendedDecisionShortName(checkList) {
        if (checkList.recommendedDecision !== null) {
            return checkList.recommendedDecision.shortName;
        }
        return "";
    },

    businessServiceShortName(checkList) {
        if (checkList === null) return "";
        if (checkList.businessService !== null) {
            return checkList.businessService.shortName;
        }
        return "";
    },

    calcSystemShortName(checkList) {
        if (checkList.calcSystem !== null) {
            return checkList.calcSystem.shortName;
        }
        return "";
    },

    connectionDecisionShortName(checkList) {
        if (checkList.connectionDecision !== null) {
            return checkList.connectionDecision.shortName;
        }
        return "";
    },

    doTest(){
        return 'TEST'
    }
}
