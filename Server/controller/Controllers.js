const axios = require('axios')
const {BankData, ProcessedData, Indicator, LogData} = require("../models")
const importExcel = require('convert-excel-to-json')
const del = require('del')

class Controllers{
  static excelToJSON(req, res){
    let result = importExcel({
      sourceFile: './uploads/' + req.file.originalname,
      header: {rows: 1},
      columnToKey: {
        A: 'periode',
        B: 'sandiBank',
        C: 'kreditKol1',
        D: 'kreditKol2',
        E: 'kreditKol3',
        F: 'kreditKol4',
        G: 'kreditKol5',
        H: 'laba',
        I: 'modal',
        J: 'totalAset',
        K: 'atmr',
        L: 'bebanOperasional',
        M: 'pendapatanOperasional',
        N: 'danaPihakKetiga'
      },
      sheets: ['Sheet1']
    })
    return BankData.bulkCreate(result.Sheet1.map(data => {return data}))
    .then(response => {
      del(['./uploads/'+ req.file.originalname])
    })
    .catch(e => console.log(e))
  }

  static async getBank(req, res){
    try {
      const bank = await BankData.findAll()
      const outputProcessed = await ProcessedData.bulkCreate(bank.map(dataBank => {
        const totalKredit = (dataBank.kreditKol1 + dataBank.kreditKol2 + dataBank.kreditKol3 + dataBank.kreditKol4 + dataBank.kreditKol5)
        const obj = {
          NPL: ((dataBank.kreditKol3 + dataBank.kreditKol4 + dataBank.kreditKol5) / totalKredit).toFixed(2)*100,
          ROE: (dataBank.laba/dataBank.modal).toFixed(2)*100,
          ROA: (dataBank.laba/dataBank.totalAset).toFixed(2)*100,
          CAR: (dataBank.modal/dataBank.atmr).toFixed(2)*100,
          BOPO: (dataBank.bebanOperasional/dataBank.pendapatanOperasional).toFixed(2)*100,
          LDR: (totalKredit/dataBank.danaPihakKetiga).toFixed(2)*100,
          BankDatumId: dataBank.id
        }
        return obj
      }))
      await Indicator.bulkCreate(outputProcessed.map(processed => {
        let countRed = 0
        const color = {
          Rk: processed.NPL > 5 ? (countRed++, 'red') : 'green',
          Pr: processed.ROE <= 5 || processed.ROA < 1 ? (countRed++, 'red') : 'green',
          Re: processed.CAR < 20 ? (countRed++, 'red') : 'green',
          Ef: processed.BOPO > 80 ? (countRed++, 'red') : 'green',
          Lk: processed.LDR > 94 || processed.LDR < 82 ? (countRed++, 'red') : 'green',
          Komposit: countRed > 2 ? 'red' : countRed === 2 ? 'yellow' : 'green',
          ProcessedDatumId: processed.id
        }
        return color
      }))
      const output = await Indicator.findAll({
        include: [
          {model: ProcessedData,
          include: [
            {model: BankData}
          ]}
        ]
      })
      res.status(200).json(output)
    } catch (e) {
      res.status(500).json('internal server error')
    }
  }

  static async postLog(req, res) {
    try{
      const obj = {
        Log: req.body.Log
      }
      let inputLog = await LogData.create(obj)
      res.status(201).json(inputLog)
    } catch (e) {
      res.status(500).json('internal server error')
    }
  }

  static async getLog(req, res) {
    try{
      let outputLog = await LogData.findAll()
      res.status(200).json(outputLog)
    } catch (e) {
      res.status(500).json('internal server error')
    }
  }
}

module.exports = Controllers