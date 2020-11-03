import { jsPDF } from 'jspdf'
import DocumentTranslator from './document-trans'
import { fontBold } from './document-font-bold'
import { fontNormal } from './document-font-normal'
fontBold(jsPDF.API)
fontNormal(jsPDF.API)
let Document = function () {
  this.doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a5',
  })

  this.__ = DocumentTranslator

  this.reset()
}

Document.prototype.reset = function () {
  this.doc.setFont('TimesNewRoman', 'normal')
  this.doc.setFontSize(10)
  this.doc.setTextColor(0, 0, 0)
}

Document.prototype.create = function (data, translations, qrcode, output) {
  this.__.setLocale(data.locale)

  this.draw()

  this.fill(data)

  //this.addSignature(signature);

  this.addQrCode(qrcode)

  return this.doc.output(output, this.getName(data))
}

Document.prototype.preview = function (data, translations, qrcode) {
  // Method 1
  let content = this.create(data, translations, qrcode, 'blob')
  let file = new Blob([content], { type: 'application/pdf' })
  let fileURL = URL.createObjectURL(file)
  const winHtml = `<!DOCTYPE html>
    <html>
      <head>
        <title>${translations}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <script>
          function printStatement(){
            window.frames.statement.print()
            setTimeout(() => {
              window.close()
            }, 6000)
          }
        </script>
        <style>
          body {min-height: 100vh; scroll-behavior: smooth; text-rendering: optimizeSpeed; margin: 0;}
          .wrapper {position: relative; width: 100%; height: 80vh;}
          iframe {min-height: 80vh;}
          .button {width:100%;}
          .cover {width:100%;height:80vh;position:absolute;top:0;left:0;z-index:9999;cursor:not-allowed;}
          button {
            background: #2653B0;
            color: #fff;
            font-size: 1.5rem;
            letter-spacing: 1px;
            font-weight: bold;
            text-transform: uppercase;
            border-radius: .5em;
            padding: 1em 2em;
            border: solid 2px #2653B0;
            margin: 2em calc(50% - 125px);
            width: 250px;
          }
        </style>
      </head>
      <body>
          <div class="wrapper">
            <div class="cover"></div>
            <iframe name="statement" src="${fileURL}" type="application/pdf" width="100%" height="100%"></iframe>
            <div class="button"><button onclick="printStatement()">${translations}</button></div>
          </div>
      </body>
    </html>`

  const winUrl = URL.createObjectURL(new Blob([winHtml], { type: 'text/html' }))

  window.open(winUrl, 'win', `width=1200,height=980,screenX=200,screenY=50`)
}

Document.prototype.getName = function (data) {
  let date = new Date()
  let year = date.getUTCFullYear()
  let month = date.getUTCMonth() + 1 // months from 1-12
  let day = date.getDate()

  if (month <= 9) {
    month = '0' + month
  }

  return 'declaratie_' + data.code + '_' + year + month + day + '.pdf'
}

Document.prototype.draw = function () {
  this.doc.setFont('TimesNewRoman', 'bold')
  this.doc.setFontSize(12)
  this.doc.text(this.__('declaration'), 105, 15, { align: 'center' })

  this.reset()

  // first rectangle
  this.doc.rect(10, 25, 190, 16)

  this.doc.text(this.__('recommendation'), 12, 30)

  this.doc.rect(12, 33, 3, 3)
  this.doc.text(this.__('send_to_hospital'), 17, 35.5)

  this.doc.rect(52, 33, 3, 3)
  this.doc.text(this.__('institutionalized_quarantine'), 57, 35.5)

  this.doc.rect(102, 33, 3, 3)
  this.doc.text(this.__('home_isolation'), 107, 35.5)

  this.doc.line(160, 25, 160, 41)
  this.doc.text(this.__('agent_signature'), 162, 30)

  // second rectangle
  this.doc.rect(10, 45, 190, 20)

  this.doc.text(this.__('last_name'), 12, 50)
  this.doc.line(28, 50.5, 80, 50.5)

  this.doc.text(this.__('first_name'), 90, 50)
  this.doc.line(106, 50.5, 197, 50.5)

  this.doc.text(this.__('identity_number'), 12, 55)
  this.doc.line(28, 55.5, 84, 55.5)

  this.doc.text(this.__('date_of_birth'), 92, 55)

  this.doc.text(this.__('year'), 130, 55)
  this.doc.line(115, 55.5, 129, 55.5)

  this.doc.text(this.__('month'), 160, 55)
  this.doc.line(145, 55.5, 159, 55.5)

  this.doc.text(this.__('day'), 190, 55)
  this.doc.line(175, 55.5, 189, 55.5)

  this.doc.text(this.__('country_departure'), 12, 60)
  this.doc.line(45, 60.5, 90, 60.5)

  // free text
  this.doc.text(this.__('i_declare'), 10, 70)

  this.doc.text(this.__('first_question'), 10, 75, { maxWidth: 190 })

  this.doc.text(this.__('second_question'), 10, 85, { maxWidth: 190 })
  this.doc.line(58, 89.8, 200, 89.8)

  this.doc.text(this.__('agree_gdpr'), 10, 95, { maxWidth: 190 })

  this.doc.text(this.__('agree_lies'), 10, 100, { maxWidth: 190 })

  // contact
  this.doc.text(this.__('contact_at'), 10, 110)

  this.doc.text(this.__('phone'), 10, 115)
  this.doc.line(35, 115.5, 70, 115.5)

  // footer
  this.doc.text(this.__('signature'), 30, 125)
  this.doc.text(this.__('date'), 167, 125)
}

Document.prototype.fill = function (data) {
  // first rectangle
  // if (data.measure.hospital) {
  //     this.doc.text('X', 12, 35.5);
  // }
  // if (data.measure.quarantine) {
  //     this.doc.text('X', 52, 35.5);
  // }
  // if (data.measure.isolation) {
  //     this.doc.text('X', 102, 35.5);
  // }

  // second rectangle
  this.doc.text(data.lastName, 55, 50, { align: 'center' })
  this.doc.text(data.firstName, 150, 50, { align: 'center' })
  this.doc.text(data.idCardNumber, 55, 55, { align: 'center' })
  this.doc.text(data.dateOfBirth.year, 122, 55, { align: 'center' })
  this.doc.text(data.dateOfBirth.month, 152, 55, { align: 'center' })
  this.doc.text(data.dateOfBirth.day, 182, 55, { align: 'center' })
  this.doc.text(data.countryDeparture, 68, 60, { align: 'center' })

  // free text
  this.doc.text(data.destinationAddress, 60, 89.2)
  this.doc.text(data.phoneNumber, 52, 115, { align: 'center' })

  // footer
  this.doc.text(data.documentDate, 170, 130, { align: 'center' })
}

Document.prototype.addSignature = function (signature) {
  if (!signature) {
    return
  }

  this.doc.addImage(signature, 'PNG', 20, 120, 40, 30)
}

Document.prototype.addQrCode = function (qrcode) {
  if (!qrcode) {
    return
  }

  this.doc.addImage(qrcode, 'PNG', 185, 8, 15, 15)
}
export default Document
