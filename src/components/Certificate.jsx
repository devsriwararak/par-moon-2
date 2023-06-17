
import { Document, Page, Text, View, StyleSheet,Font } from '@react-pdf/renderer';
// import FontSarabun  from "../fonts/Sarabun-Regular.ttf" ;
import Prompt from "../fonts/Prompt-Regular.ttf"
import Mitr from "../fonts/Mitr-Regular.ttf"
import { useState,useEffect } from 'react';


Font.register({
  // family: "Sarabun",
  // src: FontSarabun ,
  family: "Mitr",
  src: Mitr ,
  // family: "Prompt",
  // src: Prompt ,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
    margin: 5,
    alignItems: 'center',

    fontFamily: "Mitr"
  },
  header1: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    fontSize: 12,
    textAlign: "left",
    marginBottom: 10,
  },
  signature: {
    fontSize: 12,
    textAlign: "left",
  }
});

const Certificate =({reportData}) => {

const [data,setData] = useState("")

  useEffect(()=> {
    setData(reportData)
    console.log(reportData)

  }, [reportData])



  const date = new Date();
  return (
    <Document>
      <Page size={[842, 595]} style={styles.page}>
        <Text style={styles.header1}>ขอมอบเกียรบัตรฉบับนี้ เพื่อแสดงว่า</Text>
        <Text style={styles.body}> {data.Customer} </Text>
        <Text style={styles.header}>ได้ชนะการประมูล</Text>
        <Text style={styles.header}> {data.AuctionTopic} </Text>
        <Text style={styles.body}> รายการของแถมที่ได้รับ </Text>
        <Text style={styles.body}> {data.Gift} </Text>
        <Text style={styles.body}>จำนวนเงิน {data.Price ? data.Price.toLocaleString() : ""} บาท</Text>
        <Text style={styles.footer}> {`Date: ${date.toDateString()}`} </Text>
        <Text style={styles.signature}>Signature:</Text>
      </Page>
    </Document>
  )
};
export default Certificate