<template>
    <footer class="kilimanjaro_area"> 

        <div v-if=show>
            <div class="foo_top_header_one section_padding_100_10">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="kilimanjaro_part">
                                <h5>Nosotros</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis nisl diam. </p>
                                <p>Donec dui lectus, euismod eget nunc sed, faucibus congue odio. Fusce mauris erat, dictum vitae rutrum in, fermentum quis ex. Phasellus aliquet id mauris nec porta. Praesent vitae arcu sapien. Integer a tortor est. Sed eget diam ac velit bibendum volutpat a at ipsum.</p>
                                <p>Ut convallis egestas nunc nec egestas. Ut cursus suscipit dolor nec sagittis. Ut convallis egestas nunc nec egestas. Ut cursus suscipit dolor nec sagittis.</p>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="kilimanjaro_part">
                                <h5>Nuestras redes sociales</h5>
                                <ul class="kilimanjaro_social_links">
                                    <li><a href="#" class="margen-derecho"><i class="fab fa-facebook-square fa-2x verde" aria-hidden="true"></i></a></li>
                                    <li><a href="#" class="margen-derecho"><i class="fab fa-twitter-square fa-2x verde" aria-hidden="true"></i></a></li>
                                    <li><a href="#" class="margen-derecho"><i class="fab fa-pinterest-square fa-2x verde" aria-hidden="true"></i></a></li>
                                    <li><a href="#" ><i class="fab fa-youtube-square fa-2x verde" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>


                            <div class="kilimanjaro_part m-top-15">
                                <h5>Ligas de interés</h5>
                                <ul class="kilimanjaro_links">
                                    <li><a href="#" @click="aviso('condiciones')"><i class="fa fa-angle-right" aria-hidden="true"></i>Términos & Condiciones</a></li>
                                    <li><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Licencia de uso</a></li>
                                    <li><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Ayuda & Soporte</a></li>
                                    <li><a href="#" @click="aviso('galletas')"><i class="fa fa-angle-right" aria-hidden="true"></i>Política de Cookies</a></li>
                                    <li><a href="#" @click="aviso('aviso')"><i class="fa fa-angle-right" aria-hidden="true"></i>Política de privacidad de datos</a></li>
                                    <li><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Foros y comunidad</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="kilimanjaro_part">
                                <h5>Últimas noticias</h5>
                                <div class="kilimanjaro_blog_area">
                                    <div class="kilimanjaro_thumb">
                                    <img class="img-fluid" src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg" alt="">

                                    </div>
                                    <a href="#">Canario del áfrica central</a>
                                    <p class="kilimanjaro_date">21 Enero 2018</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                                </div>
                                <div class="kilimanjaro_blog_area">
                                    <div class="kilimanjaro_thumb">
                                    <img class="img-fluid" src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg" alt="">
                                    </div>
                                    <a href="#">Perrito cruzado con pulpo</a>
                                    <p class="kilimanjaro_date">14 Junio 2020</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                                </div>
                                <div class="kilimanjaro_blog_area">
                                    <div class="kilimanjaro_thumb">
                                    <img class="img-fluid" src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg" alt="">
                                    </div>
                                    <a href="#">Pecesito dorado come tarántulas</a>
                                    <p class="kilimanjaro_date">27 Diciembre 2021</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="kilimanjaro_part">
                                <h5>Contacto</h5>
                                <div class="kilimanjaro_single_contact_info">
                                    <h4 style="margin-bottom: 10px;"><i class="fas fa-phone fa-lg" style="padding-top: 10%"></i> Teléfonos</h4>
                                    <p>+52 (55) 1691 3060<br> +1 (418) 909 400</p>
                                </div>
                                <div class="kilimanjaro_single_contact_info">
                                    <h4 style="margin-bottom: 10px;"><i class="fas fa-envelope fa-lg" style="padding-top: 10%"></i> Correos</h4>
                                    <p>
                                    <a href = "mailto: asupport@petstore.ci.ultrasist.net">support@petstore.ci.ultrasist.net</a> 
                                    <br> 
                                    <a href = "mailto: petstore@gmail.com">petstore@gmail.com</a>
                                    </p>
                                </div>
                                <div class="kilimanjaro_single_contact_info">
                                    <h4 style="margin-bottom: 10px;"><i class="fas fa-map-marker-alt fa-lg" style="padding-top: 10%"></i> Direccion</h4>
                                    <p>Calle Kopoma 395 <br> Col. Pedregal de San Nicolás <br> Del Tlalpan, CP 14100<br>Ciudad de México, MÉXICO</p>
                                </div>
                            </div>
                    
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer Bottom Area Start -->
            <div class=" kilimanjaro_bottom_header_one section_padding_50 text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <p>© Todos los derechos reservados. 2021<br/>Sitio desarrollado por: <br/><a href="https://ultrasist.mx" target="_blank" style="color:#27ae60;">Ultrasist SA de CV -(con amor) <i class="fa fa-heart rojo" aria-hidden="true"></i></a></p>
                            <button class="btn green" @click="$modal.show('demo-login')">Demo: Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal
            name="advertencia"
            :clickToClose="false"
            width=89%
            height="auto"> 
            <div class="caja-advertencia">
                <div class="row contenedor">
                    <div class="col-sm-8 izq">
                        <!-- Este sitio es sólo para mayores de edad y hace uso de cookies -->
                        <label>Este sitio hace uso de cookies</label>
                    </div>
                    <div class="col-sm-4 der">
                        <button class="btn btn-outline-success" @click="ok()">Aceptar</button>
                        &nbsp;
                        <a class="btn btn-outline-danger" href="https://www.google.com">Rechazar</a>
                    </div>
                </div>
            </div>
        </modal>

        <modal
            name="avisoPoliticaPrivacidad"
            :clickToClose="true"
            width=89%
            height="auto"> 
            <div class="caja-aviso">
                <div class="row contenedor">
                    <div class="col-sm-12">
<p>POLÍTICA DE PRIVACIDAD ACTUALIZADA EL 24/05/2018</p>
<p>Titularidad del sitio web.</p>
<p>Majestic Solutions S.L.<br />
Leon y Castillo 87 p3 &#8211; 1<br />
Las Palmas de Gran Canaria<br />
35004 Las Palmas, España<br />
CIF B98731144<br />
Registro Mercantil de Las Palmas T 212 L0 F 181, l 2ª</p>
<p>Sitio web: petstore.com</p>
<p>Correo electrónico info arroba petstore.com</p>
<p>Protección de datos de carácter personal según la LOPD</p>
<p>La empresa expuesta arriba, en adelante el “PROVEEDOR DE SERVICIOS”, es propietaria de este sitio petstore.com en adelante, el “SITIO WEB”.</p>
<p>PROVEEDOR DE SERVICIOS, en aplicación de la normativa vigente en materia de protección de datos de carácter personal, informa que los datos personales que se recogen a través de los formularios del Sitio web: SITIO WEB, se incluyen en los ficheros automatizados específicos de usuarios de los servicios de PROVEEDOR DE SERVICIOS.</p>
<p>La recogida y tratamiento automatizado de los datos de carácter personal tiene como finalidad el correcto funcionamiento del servicio que da el SITIO WEB, el mantenimiento de la relación comercial en caso que la haya y el desempeño de tareas de información, asesoramiento y otras actividades propias de PROVEEDOR DE SERVICIOS.</p>
<p>Estos datos únicamente serán cedidos a aquellas entidades que sean necesarias con el único objetivo de dar cumplimiento a la finalidad anteriormente expuesta.</p>
<p>PROVEEDOR DE SERVICIOS. adopta las medidas necesarias para garantizar la seguridad, integridad y confidencialidad de los datos conforme a lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos.</p>
<p>El usuario podrá en cualquier momento ejercitar los derechos de acceso, oposición, rectificación y cancelación reconocidos en el citado Reglamento (UE). El ejercicio de estos derechos puede realizarlo el propio usuario a través de email o dirección arriba expuestos.</p>
<p>El usuario manifiesta que todos los datos facilitados por él son ciertos y correctos, y se compromete a mantenerlos actualizados, comunicando los cambios a PROVEEDOR DE SERVICIOS.</p>
<p>Finalidad del tratamiento de los datos personales:</p>
<p>Trataremos tus datos personales recabados a través el SITIO WEB, con las siguientes finalidades:</p>
<p>Formulario Publicar. Para poderte prestar el servicio solicitado, para que puedas publicar UNA PÁGINA WEB DE TIPO INFORMATIVO. Recuerda que los datos que facilites en este formulario a excepción del tu email serán públicos.</p>
<p>Formulario Contactar. Para que puedas contactar con CON EL CREADOR DE LA PÁGINA WEB, estos datos son privados y serán enviados al TITULAR. Nunca cederemos estos datos y nunca te enviaremos ninguna notificación a ellos. En el caso que seas un USUARIO la persona que te contacte nunca sabrá tu email a menos que le respondas al correo que te envía la web.</p>
<p>Formularios Denunciar. Para poder reportar el mal uso de las PÁGINAS WEB. Estos datos son privados y una vez ejercida una acción podemos responderte por email las acciones tomadas. Nunca cederemos estos datos y nunca te enviaremos ningún boletín a ellos.</p>
<p>Remitir boletines (newsletters), así como comunicaciones comerciales de promociones y/o publicidad de SITIO WEB o las webs que administra el PROVEEDOR SE SERVICIOS, nunca de terceros.</p>
<p>Contabilidad, sólo para los usuarios que pongan QUE CONTRATEN UN HOSTING DE PAGO de pago almacenaremos sus datos para poder realizar facturas o tiquetes de caja si no la solicitas, en caso de que pagues con tarjeta COMMERCEGATE (El banco), almacenará esos datos, nunca nosotros.</p>
<p>Te recordamos que puedes oponerte al envío de comunicaciones comerciales por cualquier vía y en cualquier momento, remitiendo un correo electrónico a la dirección indicada anteriormente.</p>
<p>Los campos de dichos registros son de cumplimentación obligatoria, siendo imposible realizar las finalidades expresadas si no se aportan esos datos.</p>
<p>¿Por cuánto tiempo se conservan los datos personales recabados?</p>
<p>Los datos personales proporcionados se conservarán mientras se mantenga la relación comercial o no solicites su supresión y durante el plazo por el cuál pudieran derivarse responsabilidades legales por los servicios prestados.</p>
<p>Si tu no borraras TU PAGINA WEB, EL PROVEEDOR DE SERVICIOS, los mantendrá públicos por periodo de 2 años, a los dos años de inactividad TU PAGÍNA WEB caducara. Te recordamos que puedes borrar tus páginas web en cualquier momento desde tu panel de control.</p>
<p>Una vez elimines una página web la ley nos obliga a guardar los datos de tu página web borrada por periodo de un año por si hubiera una investigación policial, tus datos no serán públicos, pero físicamente serán borrados cuando cumplan este periodo.</p>
<p>Legitimación:</p>
<p>El tratamiento de tus datos se realiza con las siguientes bases jurídicas que legitiman el mismo:</p>
<p>La solicitud de información y/o la contratación de los servicios de EL PROVEEDOR DE SERVICIOS, cuyos términos y condiciones se pondrán a tu disposición en todo caso, de forma previa a una eventual contratación.</p>
<p>El consentimiento libre, específico, informado e inequívoco, en tanto que te informamos poniendo a tu disposición la presente política de privacidad, que tras la lectura de la misma, en caso de estar conforme, puedes aceptar mediante una declaración o una clara acción afirmativa, como el marcado de una casilla dispuesta al efecto. En caso de que no nos facilites tus datos o lo hagas de forma errónea o incompleta, no podremos atender tu solicitud, resultando del todo imposible proporcionarte la información solicitada o llevar a cabo la contratación de los servicios.</p>
<p>Destinatarios:</p>
<p>Los datos no se comunicarán a ningún tercero ajeno a PROVEEDOR DE SERVICIOS, salvo obligación legal.</p>
<p>Como encargados de tratamiento, tenemos contratados a los proveedores de servicios externos, como empresas de cobro, gestión y administración, programación, hosting, habiéndose comprometido al cumplimiento de las disposiciones normativas, de aplicación en materia de protección de datos, en el momento de su contratación.</p>
<p>Si contactas con un USUARIO CREADOR DE PÁGINAS WEB tus datos serán cedidos a él porque así lo solicitas.</p>
<p>Datos recopilados por usuarios de los servicios</p>
<p>En los casos en que el usuario incluya ficheros con datos de carácter personal en los servidores de alojamiento compartido, PROVEEDOR DE SERVICIOS no se hace responsable del incumplimiento por parte del usuario del RGPD.</p>
<p>Retención de datos en conformidad a la LSSI</p>
<p>El PROVEEDOR DE SERVICIOS informa de que, como prestador de servicio de alojamiento de datos y en virtud de lo establecido en la Ley 34/2002 de 11 de julio de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI), retiene por un periodo máximo de 12 meses la información imprescindible para identificar el origen de los datos alojados y el momento en que se inició la prestación del servicio. La retención de estos datos no afecta al secreto de las comunicaciones y sólo podrán ser utilizados en el marco de una investigación criminal o para la salvaguardia de la seguridad pública, poniéndose a disposición de los jueces y/o tribunales o del Ministerio que así los requiera.</p>
<p>La comunicación de datos a las Fuerzas y Cuerpos del Estado se hará en virtud de lo dispuesto en la normativa sobre protección de datos personales.</p>
<p>Derechos propiedad intelectual del SITIO WEB</p>
<p>El PROVEEDOR DE SER es titular de todos los derechos de autor, propiedad intelectual, industrial, &#8220;know how&#8221; y cuantos otros derechos guardan relación con los contenidos del sitio web SITIO WEB y los servicios ofertados en el mismo, así como de los programas necesarios para su implementación y la información relacionada.</p>
<p>No se permite la reproducción, publicación y/o uso no estrictamente privado de los contenidos, totales o parciales, del SITIO WEB sin el consentimiento previo y por escrito.</p>
<p>Propiedad intelectual del software</p>
<p>El usuario debe respetar los programas de terceros puestos a su disposición por el PROVEEDOR DE SERVICIOS, aun siendo gratuitos y/o de disposición pública.</p>
<p>El PROVEEDOR DE SERVICIOS dispone de los derechos de explotación y propiedad intelectual necesarios del software.</p>
<p>El usuario no adquiere derecho alguno o licencia por el servicio contratado, sobre el software necesario para la prestación del servicio, ni tampoco sobre la información técnica de seguimiento del servicio, excepción hecha de los derechos y licencias necesarios para el cumplimiento de los servicios contratados y únicamente durante la duración de estos.</p>
<p>Para toda actuación que exceda del cumplimiento del contrato, el usuario necesitará autorización por escrito por parte del PROVEEDOR DE SERVICIOS, quedando prohibido al usuario acceder, modificar, visualizar la configuración, estructura y ficheros de los servidores propiedad del PROVEEDOR DE SERVICIOS, asumiendo la responsabilidad civil y penal derivada de cualquier incidencia que se pudiera producir en los servidores y sistemas de seguridad como consecuencia directa de una actuación negligente o maliciosa por su parte.</p>
<p>Propiedad intelectual de los contenidos alojados</p>
<p>Se prohíbe el uso contrario a la legislación sobre propiedad intelectual de los servicios prestados por PROVEEDOR DE SERVICIOS y, en particular de:</p>
<p>La utilización que resulte contraria a las leyes españolas o que infrinja los derechos de terceros.</p>
<p>La publicación o la transmisión de cualquier contenido que, a juicio de PROVEEDOR DE SERVICIOS, resulte violento, obsceno, abusivo, ilegal, racial, xenófobo o difamatorio.</p>
<p>Los cracks, números de serie de programas o cualquier otro contenido que vulnere derechos de la propiedad intelectual de terceros.</p>
<p>La recogida y/o utilización de datos personales de otros usuarios sin su consentimiento expreso o contraviniendo lo dispuesto en Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos.</p>
<p>La utilización del servidor de correo del dominio y de las direcciones de correo electrónico para el envío de correo masivo no deseado.</p>
<p>El usuario tiene toda la responsabilidad sobre el contenido de su web, la información transmitida y almacenada, los enlaces de hipertexto, las reivindicaciones de terceros y las acciones legales en referencia a propiedad intelectual, derechos de terceros y protección de menores.</p>
<p>El usuario es responsable respecto a las leyes y reglamentos en vigor y las reglas que tienen que ver con el funcionamiento del servicio online, comercio electrónico, derechos de autor, mantenimiento del orden público, así como principios universales de uso de Internet.</p>
<p>El usuario indemnizará a PROVEEDOR DE SERVICIOS por los gastos que generara la imputación de la PROVEEDOR DE SERVICIOS en alguna causa cuya responsabilidad fuera atribuible al usuario, incluidos honorarios y gastos de defensa jurídica, incluso en el caso de una decisión judicial no definitiva.</p>
<p>Protección de la información alojada</p>
<p>PROVEEDOR DE SERVICIOS realiza copias de seguridad de los contenidos alojados en sus servidores, sin embargo, no se responsabiliza de la pérdida o el borrado accidental de los datos por parte de los usuarios. De igual manera, no garantiza la reposición total de los datos borrados por los usuarios, ya que los citados datos podrían haber sido suprimidos y/o modificados durante el periodo del tiempo transcurrido desde la última copia de seguridad.</p>
<p>Los servicios ofertados, excepto los servicios específicos de backup, no incluyen la reposición de los contenidos conservados en las copias de seguridad realizadas por PROVEEDOR DE SERVICIOS, cuando esta pérdida sea imputable al usuario; en este caso, se determinará una tarifa acorde a la complejidad y volumen de la recuperación, siempre previa aceptación del usuario.</p>
<p>La reposición de datos borrados sólo está incluida en el precio del servicio cuando la pérdida del contenido sea debida a causas atribuibles a PROVEEDOR DE SERVICIOS.</p>
<p>Comunicaciones comerciales</p>
<p>En aplicación de la LSSI. PROVEEDOR DE SERVICIOS no enviará comunicaciones publicitarias o promocionales por correo electrónico u otro medio de comunicación electrónica equivalente que previamente no hubieran sido solicitadas o expresamente autorizadas por los destinatarios de estas.</p>
<p>En el caso de usuarios con los que exista una relación contractual previa, PROVEEDOR DE SERVICIOS sí está autorizado al envío de comunicaciones comerciales referentes a productos o servicios de PROVEEDOR DE SERVICIOS que sean similares a los que inicialmente fueron objeto de contratación con el cliente.</p>
<p>En todo caso, el usuario, tras acreditar su identidad, podrá solicitar que no se le haga llegar más información comercial a través de los canales de Atención al Cliente.</p>
<p>¿Cuáles son tus derechos cuando nos facilitas tus datos?</p>
<p>• Derecho de información</p>
<p>• Derecho de acceso</p>
<p>• Derecho de rectificación</p>
<p>• Derecho de cancelación</p>
<p>• Derecho de limitación</p>
<p>• Derecho a la portabilidad</p>
<p>• Derecho de oposición</p>
                    </div>
                </div>
            </div>
        </modal>

        <modal
            name="condiciones"
            :clickToClose="true"
            width=89%
            height="auto"> 
            <div class="caja-aviso">
                <div class="row contenedor">
                    <div class="col-sm-12">
<p>CONDICIONES DE USO ACTUALIZADAS EL 08/02/2020</p>
<p>1.- Titularidad del sitio web.</p>
<p>Majestic Solutions S.L. Leon y Castillo 87 p3 - 1 Las Palmas de Gran Canaria 35004 Las Palmas, Espa&ntilde;a CIF B98731144 Registro Mercantil de Las Palmas T 212 L0 F 181, l 2&ordf; Correo electr&oacute;nico info arroba petstore.com</p>

<p>2.- Aceptaci&oacute;n de las condiciones de uso</p>
<p>Este SITIO WEB es titularidad de la empresa rese&ntilde;ada en el punto uno de este documento, en adelante el PROVEEDOR DE SERVICIOS.</p>
<p>El servicio que provee el PROVEEDOR DE SERVICIOS es el de hosting o alojamiento web en un servidor con una conexi&oacute;n segura a internet y un software para poder publicar p&aacute;ginas web de car&aacute;cter personal, las cuales desarrollan una actividad de tipo informativa de forma gratuita.</p>
<p>El PROVEEDOR DE SERVICIOS, no participa en la creaci&oacute;n de ninguna de las paginas web de este sitio, son p&aacute;ginas web creadas por USUARIOS, el PROVEEDOR DE SERVICIOS, s&oacute;lo las aloja.</p>
<p>La utilizaci&oacute;n del portal atribuye la condici&oacute;n de USUARIO e implica la aceptaci&oacute;n de todas las disposiciones incluidas en este AVISO LEGAL</p>
<p>La inserci&oacute;n de P&Aacute;GINAS WEB en el portal implica la aceptaci&oacute;n de todas las disposiciones del AVISO LEGAL.</p>
<p>El PROVEEDOR DE SERVICIOS se reserva el derecho de modificar las condiciones de uso del SITIO WEB. Por ello, es obligaci&oacute;n del usuario leerlas peri&oacute;dicamente.</p>
<p>El PROVEEDOR DE SERVICIOS no puede asumir ninguna responsabilidad derivada del uso incorrecto, inapropiado o il&iacute;cito de la informaci&oacute;n aparecida en las p&aacute;ginas de Internet del SITIO WEB</p>
<p>Con los l&iacute;mites establecidos en la ley, el SITIO WEB no asume ninguna responsabilidad derivada de la falta de veracidad, integridad, actualizaci&oacute;n y precisi&oacute;n de los datos o informaciones que se contienen en sus p&aacute;ginas de Internet.</p>
<p>Las p&aacute;ginas de Internet del SITIO WEB pueden contener enlaces (links) a otras p&aacute;ginas de terceras partes que el PROVEEDOR DE SERVICIOS no puede controlar. Por lo tanto, el PROVEEDOR DE SERVICIOS no puede asumir responsabilidades por el contenido que pueda aparecer en p&aacute;ginas de terceros.</p>
<p>Los textos, im&aacute;genes, sonidos, animaciones, software y el resto de contenidos incluidos en este SITIO WEB son propiedad exclusiva de sus LICENCIANTES. Cualquier acto de transmisi&oacute;n, distribuci&oacute;n, cesi&oacute;n, reproducci&oacute;n, almacenamiento o comunicaci&oacute;n p&uacute;blica total o parcial, debe contar con el consentimiento expreso del PROVEEDOR DE SERVICIOS .</p>
<p>Asimismo, para acceder a algunos de los servicios que el PROVEEDOR DE SERVICIOS ofrece a trav&eacute;s del SITIO WEB se deber&aacute; proporcionar algunos datos de car&aacute;cter personal. En cumplimiento de lo establecido en la Ley Org&aacute;nica 15/1999, de 13 de diciembre, de Protecci&oacute;n de Datos de Car&aacute;cter Personal le informamos que, mediante la cumplimentaci&oacute;n de los presentes formularios, sus datos personales quedar&aacute;n incorporados y ser&aacute;n tratados en los ficheros del PROVEEDOR DE SERVICIOS, con el fin de poderle prestar y ofrecer nuestros servicios as&iacute; como para informarle de las mejoras del SITIO WEB. Puede obtener m&aacute;s informaci&oacute;n en la Pol&iacute;tica de privacidad.</p>
<p>Asimismo, le informamos de la posibilidad de que ejerza los derechos de acceso, rectificaci&oacute;n, cancelaci&oacute;n y oposici&oacute;n de sus datos de car&aacute;cter personal, manera gratuita mediante email o por correo ordinario al PROVEEDOR DE SERVICIOS propietario de este SITIO WEB y establece las siguientes condiciones de uso.</p>

<p>3.- Mayor&iacute;a de edad.</p>
<p>El presente SITIO WEB est&aacute; destinado exclusivamente a personas mayores de edad. Por ello, queda expresamente prohibida la utilizaci&oacute;n del SITIO WEB y navegaci&oacute;n a trav&eacute;s del mismo por menores de edad. Asimismo, no admitimos menores con permiso paterno, ni menores legalmente emancipados. Si eres menor de edad, abandona inmediatamente el SITIO WEB.</p>
<p>El PROVEEDOR DE SERVICIOS se reserva el derecho de borrar, bloquear y no permitir nuevas publicaciones a cualquier USUARIO sobre el cual existiese sospechas o indicios de que es menor de edad.</p>
<p>El PROVEEDOR DE SERVICIOS se reserva el derecho de pedir a cualquier USUARIO un documento legal acreditativo (DNI, C&eacute;dula, IFE, Pasaporte) donde se muestre su edad y una fotograf&iacute;a identificativa para REANUDAR el servicio.</p>
<p>Toda PAGINA WEB DE CARACTER PERSONAL posee de un formulario con bot&oacute;n &ldquo;DENUNCIAR&rdquo; d&oacute;nde puede reportar nos puede reportar la minor&iacute;a de edad de cualquiera de nuestros USUARIOS y actuaremos con CONTUNDENCIA.</p>
<p>Nos tomamos muy en serio el control de la mayor&iacute;a de edad de los USUARIOS, de modo que si detectamos falsas denuncias por parte de un USUARIO a otro USUARIO, podemos restringir el servicio de forma PERMANENTE el servicio al que haga mal uso del sistema de denuncias del SITIO WEB.</p>

<p>4.- Definici&oacute;n del servicio del SITIO WEB</p>
<p>El servicio del SITIO WEB consiste en la suministraci&oacute;n de un hardware, un software y una conexi&oacute;n segura a internet, para el HOSPEDAJE DE DE P&Aacute;GINAS WEB de car&aacute;cter personal de forma GRATUITA, estas p&aacute;ginas web son CREADAS POR LOS USUARIOS, de forma INFORMATIVA.</p>

<p>5.- Condiciones generales sobre USUARIOS</p>
<p>Para publicar un PAGINA WEB el USUARIO tiene que completar el formulario PUBLICAR, una vez publicado la p&aacute;gina web recibir&aacute; un email de gesti&oacute;n con el cual podr&aacute; ver, editar / modificar, subir fotos, videos y administrar sus comentarios o eliminar su p&aacute;gina web.</p>
<p>Una vez creada la p&aacute;gina web, el usuario podr&aacute; administrar sus p&aacute;ginas desde su PANEL DE USUARIO, si este pierde su acceso puede recuperarlo en la pesta&ntilde;a &ldquo;RECUPERAR CONTRASE&Ntilde;A&rdquo;.</p>
<p>El PROVEEDOR DE SERVICIOS, bajo la petici&oacute;n de modificaci&oacute;n, borrado u otras sobre una P&Aacute;GINA WEB, solo las aceptar&aacute; cuando provengan del email de gesti&oacute;n de USUARIO QUE LA CREO, nunca de otro.</p>
<p>UNA P&Aacute;GINA WEB permanecer&aacute; publicada hasta que el usuario decida borrarlo, SI EL USUARIO no actualiza su p&aacute;gina web en 2 a&ntilde;os, el PROVEEDOR se reserva el derecho a eliminarla.</p>
<p>El SITIO WEB se define como un portal de HOSTING DE P&Aacute;GINAS WEB PERSONALES de modo que UN USUARIO debe facilitar un tel&eacute;fono valido para ser contactado. El PROVEEDOR DE SERVICIOS se reserva el derecho de borrar cualquier P&Aacute;GINA WEB con datos err&oacute;neos.</p>

<p>El USUARIO es responsable de todo lo que publica, de sus actos y de todo da&ntilde;o que pudiera ocasionar. El PROVEEDOR DE SERVICIOS pondr&aacute; a disposici&oacute;n inmediata de la polic&iacute;a, juzgados o entidades gubernamentales aquella cualquier informaci&oacute;n que le sea requerida.</p>
<p>El PROVEEDOR DE SERVICIOS no es responsable de lo que pueda publicar un USUARIO, http://www.lssi.gob.es/. Asimismo, el PROVEEDOR DE SERVICIOS no es responsable de los contenidos que transmiten o alojan o a los que facilita el acceso, si no participa en su elaboraci&oacute;n o no tiene conocimiento de la ilegalidad de estos.</p>
<p>EL PROVEEDOR DE SERVICIOS ser&aacute; responsable si conoce la ilicitud de un contenido que publica un USUARIO y no act&uacute;a r&aacute;pidamente para retirarlo o imposibilitar el acceso al mismo, de modo que si un USUARIO proporciona informaci&oacute;n y documenta la ilicitud de alg&uacute;n contenido el PROVEEDOR DE SERVICIOS habilitar&aacute; cuantos medios inform&aacute;ticos tenga para que no se repita.</p>
<p>En el supuesto de que el PROVEEDOR reciba denuncia por una supuesta infracci&oacute;n de copyright o tenga constancia a trav&eacute;s de denuncia de la publicaci&oacute;n de un tel&eacute;fono falso o no veraz en un USUARIO, el PROVEEDOR podr&aacute; solicitar documentaci&oacute;n que pruebe dicha denuncia.</p>
<p>El USUARIO se compromete a utilizar el Portal, sus contenidos y servicios conforme con:</p>
<p>La Ley o cualesquiera otras normas del ordenamiento jur&iacute;dico aplicable.</p>
<p>Las presentes Condiciones de Uso.</p>
<p>Las Normas de Publicaci&oacute;n.</p>
<p>Las buenas costumbres.</p>
<p>El orden p&uacute;blico.</p>

<p>El USUARIO deber&aacute; CREAR SU P&Aacute;GINA WEB en la categor&iacute;a adecuada y la localidad en la que se encuentre y comprometerse a:</p>
<p>No cometer a trav&eacute;s del SITIO WEB ning&uacute;n delito recogido en el C&oacute;digo Penal o en cualquier otra normativa aplicable. En concreto, y sin car&aacute;cter limitativo sino ejemplificativo, queda estrictamente prohibido en el SITIO WEB:</p>
<p>La trata de seres humanos.</p>
<p>El tr&aacute;fico de &oacute;rganos.</p>
<p>El tr&aacute;fico de drogas.</p>
<p>La comisi&oacute;n de delitos contra la libertad e indemnidad sexuales.</p>
<p>No incitar a actuar de forma ilegal.</p>
<p>No difundir difamaciones, calumnias, injurias y/o contenidos o propaganda de car&aacute;cter racista, xen&oacute;fobo, de apolog&iacute;a del terrorismo o que atenten contra los derechos humanos.</p>
<p>No manifestar falsedades o inducir a error.</p>
<p>No suplantar a otros usuarios utilizando sus claves de acceso a los distintos servicios y/o contenidos del Portal.</p>
<p>No abusar del sistema de &ldquo;denunciar&rdquo; .</p>

<p> No difundir comunicaciones no solicitadas o autorizadas.</p>
<p>No difundir mensajes que atenten contra la dignidad de terceros o que sean groseros o falten el respeto.</p>
<p>No usar robots, spiders, &ldquo;scrapers&rdquo; o cualquier otro medio autom&aacute;tico para acceder al Portal para copiar, retirar, renovar o publicar contenido sin previo consentimiento escrito por EL PROVEEDOR DE SERVICIOS.</p>
<p>No almacenar o en cualquier forma recabar informaci&oacute;n o datos personales de terceros sin su consentimiento, incluidas las direcciones de correo electr&oacute;nico.</p>
<p>No esquivar, evitar o &ldquo;saltar&rdquo; las medidas utilizadas para impedir o restringir el acceso al Portal.</p>
<p>Es necesario completar todos los campos obligatorios del formulario PUBLICAR UNA P&Aacute;GINA WEB.</p>
<p>Hay que respetar las categor&iacute;as y las secciones (demanda vs. oferta).</p>
<p>No est&aacute; permitido publicar un UNA P&Aacute;GINA WEB id&eacute;ntica o similar a otro ya publicado.</p>
<p>No est&aacute; permitido utilizar correos ficticios para publicar UNA P&Aacute;GINA WEB.</p>
<p>No est&aacute; permitido escribir UNA P&Aacute;GINA WEB en may&uacute;sculas.</p>
<p>No est&aacute; permitido utilizar palabras clave (&ldquo;Keyword Spamming&rdquo;).</p>
<p>No est&aacute; permitido utilizar sistemas o herramientas para la publicaci&oacute;n o renovaci&oacute;n masiva y/o autom&aacute;tica de P&Aacute;GINAS WEB, sin el previo consentimiento escrito por EL PROVEEDOR DE SERVICIOS.</p>
<p>No est&aacute; permitido copiar, procesar o distribuir el texto y/o las fotos o im&aacute;genes de terceros sin su previa autorizaci&oacute;n.</p>
<p>No est&aacute; permitido incluir el n&uacute;mero de tel&eacute;fono o el correo electr&oacute;nico fuera de los campos expl&iacute;citamente previstos para incluir est&aacute; informaci&oacute;n en el formulario PUBLICAR.</p>
<p>El PROVEEDOR pondr&aacute; en inmediato conocimiento de las autoridades competentes cualquier sospecha o indicio que tenga de la comisi&oacute;n de un delito a trav&eacute;s del SITIO WEB, reserv&aacute;ndose el derecho a restringir total y permanentemente el acceso al mismo por parte de los presuntos implicados.</p>
<p>La informaci&oacute;n proporcionada por el USUARIO deber&aacute; en todo momento ser veraz, respondiendo el usuario por todas aquellas manifestaciones, datos, contenidos, informaciones y detalles que sean falsos, vagos o inexactos. En el caso de la comunicaci&oacute;n de datos de car&aacute;cter personal en el cumplimiento de los cuestionarios de alta como cliente y la publicaci&oacute;n de una oferta, esta informaci&oacute;n habr&aacute; de ser cierta, exacta y coincidente. El usuario se compromete y se obliga a comunicar cualquier cambio o modificaci&oacute;n futura de sus datos de car&aacute;cter personal, adapt&aacute;ndolos, en consecuencia, a su situaci&oacute;n real. La inexactitud de la informaci&oacute;n exime a PROVEEDOR DE SERVICIOS de cualquier responsabilidad por la falta de informaci&oacute;n del usuario en relaci&oacute;n con las ofertas y los servicios, siempre que PROVEEDOR DE SERVICIOS, hubiese actuado con la debida diligencia en sus comunicaciones. En todo caso, el usuario ser&aacute; el &uacute;nico responsable de las manifestaciones falsas o inexactas que realice y de los perjuicios que cause a PROVEEDOR DE SERVICIOS o a terceros por la informaci&oacute;n que facilite. A los efectos del presente contrato, no se considerar&aacute; falta de veracidad la utilizaci&oacute;n de apodos o pseud&oacute;nimos para identificar a los usuarios en el portal, siempre y cuando esto no suponga un obst&aacute;culo para conocer la identidad real de los mismos o llevar a cabo los cobros correspondientes a los servicios contratados a PROVEEDOR DE SERVICIOS.</p>

<p>5.- Procedimiento en caso de realizaci&oacute;n de actividades de car&aacute;cter indebido, de datos incorrectos o fraudulentos</p>
<p>En el caso de que cualquier Usuario o un tercero considere que existen hechos o circunstancias que revelen el car&aacute;cter indebido de cualquier Contenido y/o de la realizaci&oacute;n de cualquier actividad en el SITIO WEB, y, en particular, la publicaci&oacute;n de im&aacute;genes incontenidas, violaci&oacute;n de derechos de propiedad intelectual, el incumplimiento de los deberes y obligaciones previstas en estas condiciones o la vulneraci&oacute;n de cualesquiera otros derechos, deber&aacute; enviar una notificaci&oacute;n a PROVEEDOR DE SERVICIOS en la que se contengan los siguientes extremos:</p>
<p>Datos personales del reclamante: nombre, direcci&oacute;n, n&uacute;mero de tel&eacute;fono y direcci&oacute;n de correo electr&oacute;nico.</p>
<p>Especificaci&oacute;n de la supuesta actividad il&iacute;cita llevada a cabo en el Sitio Web y, en particular, cuando se trate de una supuesta violaci&oacute;n de derechos, indicaci&oacute;n precisa y concreta de los contenidos protegidos, as&iacute; como de su localizaci&oacute;n en el Sitio Web.</p>
<p>Hechos o circunstancias que revelan el car&aacute;cter il&iacute;cito de dicha actividad.</p>
<p>En el supuesto de violaci&oacute;n de derechos, firma manuscrita o equivalente, con los datos personales del titular de los derechos supuestamente infringidos o de la persona autorizada para actuar en nombre y por cuenta de &eacute;sta.</p>
<p>Declaraci&oacute;n expresa, clara y bajo la responsabilidad del reclamante de que la informaci&oacute;n proporcionada en la notificaci&oacute;n es exacta y del car&aacute;cter indebido de la utilizaci&oacute;n de los contenidos o de la realizaci&oacute;n de las actividades descritas.</p>

<p>El PROVEEDOR DE SERVICIOS proceder&aacute; de inmediato a adoptar las medidas para la subsanaci&oacute;n o la eliminaci&oacute;n, en su caso, de los citados contenidos.</p>

<p>6.-Solicitar borrado a BUSCADORES de un UNA P&Aacute;GINA WEB ELIMINADA.</p>
<p>EL PROVEEDOR DE SERVICIOS, gestiona el SITIO WEB no otros como puede ser google o terceros, una vez eliminado el contenido de este SITIO WEB el USUARIO puede solicitar el borrado en GOOGLE. Para ello necesita tener una cuenta Gmail o registrarla y una vez la tenga puede solicitar el borrado en esta direcci&oacute;n web:</p>
<p>https://www.google.com/webmasters/tools/removals</p>
<p>Para solicitar el borrado en BING y YAHOO tiene que crear / tener una cuenta hotmail y solicitar el borrado en la siguiente direcci&oacute;n web:</p>
<p>http://www.bing.com/webmaster/tools/content-removal</p>

<p>7.- Propiedad intelectual e industrial</p>
<p>El SITIO WEB aloja contenidos tanto propios como contenidos creados por los usuarios. El PROVEEDOR es titular o ha obtenido licencia suficiente sobre todos los contenidos del SITIO WEB sujetos a derechos de propiedad intelectual o industrial, incluyendo, de modo enumerativo y no limitativo, c&oacute;digo fuente, textos, im&aacute;genes, logos, marcas y dise&ntilde;os.</p>
<p>Salvo que fuera autorizado por el PROVEEDOR DE SERVICIOS o a menos que ello resulte legalmente permitido, el USUARIO no podr&aacute; copiar, modificar, distribuir, vender, alquilar o explotar de cualquier otra forma contenidos del SITIO WEB (excepci&oacute;n hecha del propio contenido del usuario). Asimismo, el usuario no puede llevar a cabo operaciones de desensamblaje o descompilaci&oacute;n, ingenier&iacute;a inversa o cualquier otra operaci&oacute;n destinada a obtener cualquier c&oacute;digo fuente contenido en este SITIO WEB.</p>
<p>Con la publicaci&oacute;n de UNA P&Aacute;GINA WEB, el usuario concede al PROVEEDOR DE SERVICIOS un derecho no exclusivo, mundial, perpetuo, irrevocable, gratuito, sublicenciable y cedible para la explotaci&oacute;n del citada PAGINA WEB (incluyendo, sin limitaci&oacute;n, su reproducci&oacute;n, distribuci&oacute;n, comunicaci&oacute;n p&uacute;blica, transformaci&oacute;n y puesta a disposici&oacute;n del p&uacute;blico) de manera que el PROVEEDOR podr&aacute; utilizarlo en todos los medios y modalidades de explotaci&oacute;n. EL PROVEEDOR DE SERVICIOS se reserva el derecho de retirar contenidos en caso de que vulneren la ley, estas Condiciones de Uso o los derechos de terceras personas.</p>
<p>8.- Exclusi&oacute;n de garant&iacute;as y responsabilidad</p>
<p>8.1.-Disponibilidad y Continuidad del Portal y los Servicios</p>
<p>EL PROVEEDOR DE SERVICIOS no garantiza la disponibilidad, el acceso y/o la continuidad del funcionamiento del SITIO WEB y de sus Servicios. Asimismo, EL PROVEEDOR DE SERVICIOS no ser&aacute; responsable, con los l&iacute;mites establecidos por la Ley, de los da&ntilde;os y perjuicios causados al Usuario como consecuencia de la indisponibilidad, fallos de acceso y falta de continuidad del SITIO WEB y de sus Servicios.</p>

<p>8.2.-Contenidos y Servicios DEL SITIO WEB</p>
<p>El PROVEEDOR DE SERVICIOS responder&aacute; &uacute;nica y exclusivamente de los Servicios que preste por s&iacute; mismo y de los contenidos directamente originados por el PROVEEDOR DE SERVICIOS e identificados con su copyright. Dicha responsabilidad quedar&aacute; excluida en los casos en que concurran causas de fuerza mayor o en los supuestos en que la configuraci&oacute;n de los equipos del Usuario no sea la adecuada para permitir el correcto uso de los servicios de Internet prestados por EL PROVEEDOR DE SERVICIOS.</p>
<p>Sin perjuicio de lo dispuesto, la posible responsabilidad de EL PROVEEDOR DE SERVICIOS frente al usuario o frente a terceros se limita a la m&aacute;s alta de las siguientes cantidades: (a) el precio total que el usuario ha pagado a EL PROVEEDOR DE SERVICIOS durante los doce meses previos al acto que origin&oacute; la responsabilidad, o bien (b) la cantidad de cien (100) euros, con exclusi&oacute;n, en todo caso, de cualquier tipo de responsabilidad por da&ntilde;os indirectos o por lucro cesante.</p>
<p>El Portal no se hace responsable de la posible aparici&oacute;n de PAGINAS WEB indexadas en buscadores ajenos al portal, una vez se hayan dado de baja de nuestras bases de datos.</p>

<p>8.3.-Contenidos y Servicios de Terceros</p>
<p>EL PROVEEDOR DE SERVICIOS no revisa o controla previamente, aprueba ni hace propios los contenidos, productos, servicios, opiniones, comunicaciones, datos, archivos y cualquier clase de informaci&oacute;n de terceros recogidos en el SITIO WEB. Asimismo, no garantiza la licitud, fiabilidad, utilidad, veracidad, exactitud, exhaustividad y actualidad de los contenidos, informaciones y servicios de terceros en el SITIO WEB. EL PROVEEDOR DE SERVICIOS tampoco garantiza de ninguna forma que los Usuarios del Portal utilicen los contenidos y/o servicios de este conforme con la ley, las normativas aplicables, el orden p&uacute;blico ni las presentes Condiciones de Uso.</p>
<p>EL PROVEEDOR DE SERVICIOS no controla con car&aacute;cter previo y no garantiza la ausencia de virus y otros elementos en los contenidos y servicios prestados por terceros a trav&eacute;s del Portal que puedan introducir alteraciones en los equipos de acceso, documentos o ficheros guardados en ellos.</p>
<p>EL PROVEEDOR DE SERVICIOS no se responsabiliza de los contenidos volcados o los actos cometidos por otros usuarios. Tampoco se responsabiliza de cualquier da&ntilde;o o perjuicio como consecuencia de la presencia de virus u otros elementos en los contenidos y servicios prestados por terceros. Asimismo, EL PROVEEDOR DE SERVICIOS no responder&aacute; de los da&ntilde;os y perjuicios de cualquier naturaleza derivados del uso negligente o malintencionado de las cuentas de correo electr&oacute;nico utilizadas para insertar una PAGINA WEB o responder.</p>
<p>En cualquier caso, EL PROVEEDOR DE SERVICIOS no ser&aacute; responsable, ni indirectamente ni subsidiariamente, de la p&eacute;rdida econ&oacute;mica o reputaci&oacute;n, ni de ninguna clase de da&ntilde;os especiales, indirectos o emergentes, resultantes de la utilizaci&oacute;n del sitio web por parte del usuario.</p>
<p>La exoneraci&oacute;n de responsabilidad se&ntilde;alada en el p&aacute;rrafo anterior ser&aacute; de aplicaci&oacute;n en el caso de que EL PROVEEDOR DE SERVICIOS no tenga conocimiento efectivo de que la actividad o la informaci&oacute;n almacenada es il&iacute;cita o de que lesiona bienes o derechos de un tercero susceptibles de indemnizaci&oacute;n, o si la tuviesen act&uacute;e con diligencia para retirar los datos y contenidos o hacer imposible el acceso a ellos.</p>
<p>Sin perjuicio de lo dispuesto anteriormente, la posible responsabilidad de EL PROVEEDOR DE SERVICIOS frente al usuario o frente a terceros se limita a la m&aacute;s alta de las siguientes cantidades: (a) el precio total que el usuario ha pagado a EL PROVEEDOR DE SERVICIOS durante los doce meses previos al acto que origin&oacute; la responsabilidad, o bien (b) la cantidad de cien (100) euros.</p>

<p>9.- Servicios de tarificaci&oacute;n adicional</p>
<p>EL PROVEEDOR DE SERVICIOS cuenta con una l&iacute;nea 905 para poder pagar LOS SERVICIOS DE HOST DE LAS P&Aacute;GINAS WEB, cuya tarificaci&oacute;n es de 1,45&euro; coste para fijos y de 2.00&euro; coste para m&oacute;viles, impuestos incluidos.</p>

<p>10.-Actividades de contrataci&oacute;n electr&oacute;nica</p>
<p>El SITIO WEB dispone de cuatro tipos de productos: banner, destacados, normales y gratuitos</p>
<p>BANNERS: producto solo disponible en Espa&ntilde;a. Los BANNERS se pueden contratar para tu empresa por provincias.</p>
<p>TOPS : TU PAGINA WEB SE VER&Aacute; por encima del resto, rotan cada segundo en cada provincia diferente, se pueden contratar por horas 8,12,16,24 y por d&iacute;as 7,15 y 30</p>
<p>DESTACADO, ni sube, ni es top, solo colorea el TU P&Aacute;GINA WEB en amarillo en los listados, destacando del resto.</p>
<p>Todos los productos tienen sus precios marcados en sus respectivos pa&iacute;ses dentro de PANEL DE USUARIO DE GESTI&Oacute;N DEL HOSTING. El procedimiento para consultarlos es entrar en el PAGINA WEB, y a pie de p&aacute;gina de este se encuentran las tarifas de cada producto seg&uacute;n su plazo de contrataci&oacute;n.</p>
<p>11.- Procedimiento de la contrataci&oacute;n</p>
<p>Publique UNA P&Aacute;GINA WEB entre en el mismo y a pie de p&aacute;gina seleccione el producto que quiere contratar. Una vez seleccionado elija si quiere hacer el ingreso por tarjeta de cr&eacute;dito o d&eacute;bito o por ingreso en cuenta bancaria.</p>
<p>Si es el pago es por tarjeta EL PRODUCTO CONTRATADO se activar&aacute; de inmediato, si el pago es por ingreso en cuenta, nos tendr&aacute;n que remitir un email con la foto del comprobante del pago al respondiendo al correo que le hayamos enviado.</p>
<p>12.- Terminal punto de venta</p>
<p>El servicio de TPV el PROVEEDOR DE SERVICOS lo externaliza, encarg&aacute;ndose del mismo dos empresas COMMERCEGATE. El SITIO WEB no tiene pagos recurrentes, ni almacena n&uacute;meros de tarjeta de ning&uacute;n USUARIO.</p>
<p>Nuestro proveedor de pagos es www.cgbilling.com , cualquier duda pueden contactar con ellos.    POL&Iacute;TICA DE DEVOLUCIONES Si no esta satisfecho con el servicio publicitario prestado p&oacute;ngase en contacto con nosotros y le devolveremos su dinero en la parte proporcional a d&iacute;as de contrato le queden, siendo la devoluci&oacute;n del 100% del importe si lo reclama en las primeras 24h y en la parte proporcional a partir de las mismas.</p>

<p>13.- Pol&iacute;ticas de Fraude</p>
<p>El PROVEEDOR DE SERVICIOS se toma muy en serio cualquier uso fraudulento con tarjetas de cr&eacute;dito u operaciones bancarias realizadas por nuestros usuarios. Por ello, los usuarios responsables de este tipo de acciones ser&aacute;n bloqueados permanentemente de nuestro sitio y sus datos podr&aacute;n ser comunicados a las autoridades pertinentes.</p>

<p>Recordamos que seg&uacute;n nuestras Condiciones de Servicio, podemos limitar o poner fin a nuestro servicio, eliminar los contenidos alojados en &eacute;l y adoptar medidas t&eacute;cnicas y legales para mantener a los usuarios alejados de ESTE SITIO si creemos que est&aacute;n creando problemas o actuando de forma contraria al esp&iacute;ritu o la forma de nuestras pol&iacute;ticas, todo ello con independencia de cualquier pago realizado por el uso de ESTE SITIO o servicios complementarios</p>
<p>14.- Modificaciones del sitio web y suspensi&oacute;n del servicio</p>

<p>Modificaciones del Sitio Web</p>
<p>El PROVEEDOR DE SERVICIOS, se reserva el derecho para en cualquier momento efectuar las modificaciones que estime conveniente en el SITIO WEB, organizando, suprimiendo o a&ntilde;adiendo contenidos, datos o servicios. Las citadas modificaciones, se llevar&aacute;n a cabo de forma unilateral y sin previo aviso. En relaci&oacute;n con las condiciones generales y particulares, El PORVEEDOR DE SERVICIOS se reserva el derecho de modificarlas, alterarlas y/o redactar nuevas cl&aacute;usulas en funci&oacute;n de las nuevas actividades o servicios a las que vaya ampliando o para adaptarse a nuevas normativas y legislaciones que vayan surgiendo. Dichas modificaciones, s&oacute;lo ser&aacute;n obligatorias a partir de su entrada en vigor y ser&aacute;n de aplicaci&oacute;n para el usuario en el mismo instante en que se acceda al portal.</p>

<p>Suspensi&oacute;n del servicio.</p>
<p>El PROVEEDOR DE SERVICIOS se reserva el derecho de suspender de forma unilateral y sin preaviso el servicio, o, denegar el acceso al portal, de forma temporal o indefinida, a todo aquel usuario que incumpla las presentes condiciones generales o particulares, o lleve a cabo actos ilegales, il&iacute;citos y contrarios a la ley, al orden p&uacute;blico y a las buenas costumbres.</p>
<p>15.- Duraci&oacute;n, terminaci&oacute;n y resoluci&oacute;n.</p>
<p>La prestaci&oacute;n de los servicios del portal y su funcionamiento tiene, en principio, un car&aacute;cter indefinido. No obstante, El PROVEEDOR DE SERVICIOS podr&aacute; suspender temporalmente el servicio o darlo por finalizado de forma definitiva, en cualquier momento o instante, mediando causa justificada. En estos casos, El PROVEEDOR DE SERVICIOS se compromete mediante avisos a informar a los usuarios de la suspensi&oacute;n o interrupci&oacute;n temporal o definitiva.</p>
<p>En el caso de resoluci&oacute;n unilateral del servicio o de la baja forzada del portal, El PROVEEDOR DE SERVICIOS le informar&aacute; previamente de las causas de su resoluci&oacute;n. En estos casos, El PROVEEDOR DE SERVICIOS se compromete a guardar la informaci&oacute;n almacenada en su servidor durante el periodo de diez d&iacute;as naturales, transcurrido los cuales, proceder&aacute; al bloqueo de los mismos en la forma prevista en la normativa vigente en materia de protecci&oacute;n de datos de car&aacute;cter personal, sin que por este hecho pueda exigirle responsabilidad alguna.</p>

<p>16.- Ley de protecci&oacute;n de datos europea.</p>
<p>Asimismo, para acceder a algunos de los servicios que El SITIO WEB ofrece a trav&eacute;s del website deber&aacute; proporcionar algunos datos de car&aacute;cter personal. En cumplimiento de lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protecci&oacute;n de las personas f&iacute;sicas en lo que respecta al tratamiento de datos personales y a la libre circulaci&oacute;n de estos datos le informamos que, mediante la cumplimentaci&oacute;n de los presentes formularios, sus datos personales quedar&aacute;n incorporados y ser&aacute;n tratados en los ficheros de EL PROVEEDOR DE SERVICIOS. con el fin de poderle prestar y ofrecer nuestros servicios as&iacute; como para informarle de las mejoras del sitio Web. Asimismo, le informamos de la posibilidad de que ejerza los derechos de acceso, rectificaci&oacute;n, cancelaci&oacute;n y oposici&oacute;n de sus datos de car&aacute;cter personal, manera gratuita mediante email a o correo postal, en los datos del punto expuestos.</p>

<p>17.- Legislaci&oacute;n y fuero.</p>
<p>Todas las cuestiones relativas al SITIO WEB se rigen en todos y cada uno de sus extremos por las Leyes espa&ntilde;olas y se someten a la jurisdicci&oacute;n de los Juzgados y Tribunales competentes del territorio espa&ntilde;ol.</p>
<p>Las partes, con expresa renuncia a su propio fuero, aceptan como legislaci&oacute;n rectora del presente contrato en caso de controversia acerca de la interpretaci&oacute;n o ejecuci&oacute;n de las presentes cl&aacute;usulas, la legislaci&oacute;n espa&ntilde;ola, y se someten para la resoluci&oacute;n de cuantos litigios pudieran derivarse del mismo a los Juzgados y Tribunales de Gran Canaria, salvo en caso de contrataci&oacute;n con consumidores.</p>                        
                    </div>
                </div>
            </div>
        </modal>

        <modal
            name="galletas"
            :clickToClose="true"
            width=89%
            height="auto"> 
            <div class="caja-aviso">
                <div class="row contenedor">
                    <div class="col-sm-12">
<p>Pol&iacute;tica de cookies ULTIMA MODIFICACI&Oacute;N 28 / 06 / 2018</p>
<p>Titularidad del sitio web.</p>
<p>Majestic Solutions S.L.  Leon y Castillo 87 p3 - 1  Las Palmas de Gran Canaria  35004 Las Palmas, Espa&ntilde;a  CIF B98731144  Registro Mercantil de Las Palmas T 212 L0 F 181, l 2&ordf;   </p>

<p>Sitio web: petstore.com</p>

<p>Correo electr&oacute;nico info arroba petstore.com</p>
<p>La empresa expuesta arriba, en adelante el &ldquo;PROVEEDOR DE SERVICIOS&rdquo;, es propietaria de este sitio petstore.com en adelante, el &ldquo;SITIO WEB&rdquo;.</p>

<p>Pol&iacute;tica de cookies</p>
<p>PROVEEDOR DE SERVICIOS informa acerca del uso de las cookies en su p&aacute;gina web: SITIO WEB</p>
<p>&iquest;Qu&eacute; son las cookies?</p>
<p>Las cookies son archivos que se pueden descargar en su equipo a trav&eacute;s de las p&aacute;ginas web. Son herramientas que tienen un papel esencial para la prestaci&oacute;n de numerosos servicios de la sociedad de la informaci&oacute;n. Entre otros, permiten a una p&aacute;gina web almacenar y recuperar informaci&oacute;n sobre los h&aacute;bitos de navegaci&oacute;n de un usuario o de su equipo y, dependiendo de la informaci&oacute;n obtenida, se pueden utilizar para reconocer al usuario y mejorar el servicio ofrecido</p>
<p>Tipos de cookies</p>
<p>Seg&uacute;n quien sea la entidad que gestione el dominio desde donde se env&iacute;an las cookies y trate los datos que se obtengan se pueden distinguir dos tipos</p>
<p>Cookies propias: Aqu&eacute;llas que se env&iacute;an al equipo terminal del usuario desde un equipo o dominio gestionado por el propio editor y desde el que se presta el servicio solicitado por el usuario</p>
<p>Cookies de terceros: Aqu&eacute;llas que se env&iacute;an al equipo terminal del usuario desde un equipo o dominio que no es gestionado por el editor, sino por otra entidad que trata los datos obtenidos trav&eacute;s de las cookies.</p>
<p>En el caso de que las cookies sean instaladas desde un equipo o dominio gestionado por el propio editor, pero la informaci&oacute;n que se recoja mediante &eacute;stas sea gestionada por un tercero, no pueden ser consideradas como cookies propias.</p>
<p>Existe tambi&eacute;n una segunda clasificaci&oacute;n seg&uacute;n el plazo de tiempo que permanecen almacenadas en el navegador del cliente, pudiendo tratarse de:</p>
<p>Cookies de sesi&oacute;n: Dise&ntilde;adas para recabar y almacenar datos mientras el usuario accede a una p&aacute;gina web. Se suelen emplear para almacenar informaci&oacute;n que solo interesa conservar para la prestaci&oacute;n del servicio solicitado por el usuario en una sola ocasi&oacute;n (p.e. una lista de productos adquiridos).</p>
<p>Cookies persistentes: Los datos siguen almacenados en el terminal y pueden ser accedidos y tratados durante un periodo definido por el responsable de la cookie, y que puede ir de unos minutos a varios a&ntilde;os.</p>
<p>Por &uacute;ltimo, existe otra clasificaci&oacute;n con seis tipos de cookies seg&uacute;n la finalidad para la que se traten los datos obtenidos:</p>
<p>Cookies t&eacute;cnicas: Aquellas que permiten al usuario la navegaci&oacute;n a trav&eacute;s de una p&aacute;gina web, plataforma o aplicaci&oacute;n y la utilizaci&oacute;n de las diferentes opciones o servicios que en ella existan como, por ejemplo, controlar el tr&aacute;fico y la comunicaci&oacute;n de datos, identificar la sesi&oacute;n, acceder a partes de acceso restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido, realizar la solicitud de inscripci&oacute;n o participaci&oacute;n en un evento, utilizar elementos de seguridad durante la navegaci&oacute;n, almacenar contenidos para la difusi&oacute;n de v&iacute;deos o sonido o compartir contenidos a trav&eacute;s de redes sociales.</p>
<p>Cookies de personalizaci&oacute;n: Permiten al usuario acceder al servicio con algunas caracter&iacute;sticas de car&aacute;cter general predefinidas en funci&oacute;n de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma, el tipo de navegador a trav&eacute;s del cual accede al servicio, la configuraci&oacute;n regional desde donde accede al servicio, etc.</p>
<p>Cookies de an&aacute;lisis: Permiten al responsable de estas, el seguimiento y an&aacute;lisis del comportamiento de los usuarios de los sitios web a los que est&aacute;n vinculadas. La informaci&oacute;n recogida mediante este tipo de cookies se utiliza en la medici&oacute;n de la actividad de los sitios web, aplicaci&oacute;n o plataforma y para la elaboraci&oacute;n de perfiles de navegaci&oacute;n de los usuarios de dichos sitios, aplicaciones y plataformas, con el fin de introducir mejoras en funci&oacute;n del an&aacute;lisis de los datos de uso que hacen los usuarios del servicio.</p>
<p>Cookies publicitarias: Permiten la gesti&oacute;n, de la forma m&aacute;s eficaz posible, de los espacios publicitarios.</p>
<p>Cookies de publicidad comportamental: Almacenan informaci&oacute;n del comportamiento de los usuarios obtenida a trav&eacute;s de la observaci&oacute;n continuada de sus h&aacute;bitos de navegaci&oacute;n, lo que permite desarrollar un perfil espec&iacute;fico para mostrar publicidad en funci&oacute;n de este.</p>
<p>Cookies de redes sociales externas: Se utilizan para que los visitantes puedan interactuar con el contenido de diferentes plataformas sociales (facebook, youtube, twitter, linkedIn, etc..) y que se generen &uacute;nicamente para los usuarios de dichas redes sociales. Las condiciones de utilizaci&oacute;n de estas cookies y la informaci&oacute;n recopilada se regula por la pol&iacute;tica de privacidad de la plataforma social correspondiente.</p>
<p>Desactivaci&oacute;n y eliminaci&oacute;n de cookies</p>
<p>Tienes la opci&oacute;n de permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuraci&oacute;n de las opciones del navegador instalado en su equipo. Al desactivar cookies, algunos de los servicios disponibles podr&iacute;an dejar de estar operativos. La forma de deshabilitar las cookies es diferente para cada navegador, pero normalmente puede hacerse desde el men&uacute; Herramientas u Opciones. Tambi&eacute;n puede consultarse el men&uacute; de Ayuda del navegador d&oacute;nde puedes encontrar instrucciones. El usuario podr&aacute; en cualquier momento elegir qu&eacute; cookies quiere que funcionen en este sitio web.</p>

<p>Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuraci&oacute;n de las opciones del navegador instalado en su ordenador:</p>
<p>&bull; Microsoft Internet Explorer o Microsoft Edge: http://windows.microsoft.com/es-es/windows-vista/Block-or-allow-cookies</p>
<p>&bull; Mozilla Firefox: http://support.mozilla.org/es/kb/impedir-que-los-sitios-web-guarden-sus-preferencia</p>
<p>&bull; Chrome: https://support.google.com/accounts/answer/61416?hl=es</p>
<p>&bull; Safari: http://safari.helpmax.net/es/privacidad-y-seguridad/como-gestionar-las-cookies/</p>
<p>&bull; Opera: http://help.opera.com/Linux/10.60/es-ES/cookies.html</p>

<p>Adem&aacute;s, tambi&eacute;n puede gestionar el almac&eacute;n de cookies en su navegador a trav&eacute;s de herramientas como las siguientes</p>
<p>&bull; Ghostery: www.ghostery.com/</p>
<p>&bull; Your Online Choices: www.youronlinechoices.com/es/</p>
<p>Cookies utilizadas en SITIO WEB</p>

<p> No recabamos ning&uacute;n dato de car&aacute;cter personal con la anal&iacute;tica web y as&iacute; lo hemos configurado.</p>

<p>A continuaci&oacute;n, se identifican las cookies que est&aacute;n siendo utilizadas en este portal, as&iacute; como su tipolog&iacute;a y funci&oacute;n:</p>

<p> Cookies propias</p>

<p> - Cookies t&eacute;cnicas    __me: Asigna un n&uacute;mero de usuario en caso que publiques una p&aacute;gina web o uses un formulario. En caso contrario, no se le identificar&aacute; en ning&uacute;n caso. Caducidad de 1 a&ntilde;o.  PHPSESSID: Cookie tecnica de php. Caducidad de sesi&oacute;n de navegador.  __mayoriadeedad: Aceptaci&oacute;n mayor&iacute;a de edad.</p>

<p> __eucookie; Aceptaci&oacute;n de cookies.</p>

<p>  Cookies de terceros</p>

<p>  - Google Analytics </p>

<p> Estas cookies son usadas en su formato de IP an&oacute;nima. Los datos no los compartimos con terceros, ni en la web usamos plugins de terceros que puedan acceder a estos datos. Por este motivo pueden ser creadas sin consentimiento expreso. No obstante puedes desactivarlas si as&iacute; lo deseas.</p>

<p> https://support.google.com/analytics/answer/2763052?hl=es</p>

<p> El usuario puede revocar su consentimiento para el uso de cookies en su navegador a trav&eacute;s de las opciones del desarrollador del navegador que est&eacute; utilizando, o bien instalando un sistema de rechazo (&quot;opt-out&quot;) a trav&eacute;s de los enlaces de algunos terceros que instalan cookies en la p&aacute;gina web.</p>

<p> Opt-out de Google Analytics: https://tools.google.com/dlpage/gaoptout?hl=None </p>

<p> _ga: Diferencia a los usuarios. Caducidad de 2 a&ntilde;os.  _gat: Limita el porcentaje de solicitudes. Caducida de 1 minuto.  _gid: Diferencia a los usuarios. Caducidad de 24 horas.  __utma: Diferencia los diferentes usuarios y sesiones. Caducidad de 2 a&ntilde;os.  __utmb: Diferencia las nuevas sesiones. Caducidad de 30 minutos.</p>

<p> __utmc: Determina las nuevas sesiones, en colaboraci&oacute;n con __utmb. Caducidad de sesi&oacute;n de navegador.  __utmt: Se usa para acelerar la tasa de solicitud. Duraci&oacute;n de 10 minutos.  __utmz: Almacena la explicaci&oacute;n de c&oacute;mo el usuario lleg&oacute; al sitio web. Caducidad de 6 meses.</p>

<p>  - Alexa </p>

<p> __asc: Estas cookies permiten certificar el trafico para las m&eacute;tricas y comparativas globales del sitio web en esta herramienta. Caducidad de 1 a&ntilde;o.  __auc: Estas cookies permiten certificar el trafico para las m&eacute;tricas y comparativas globales del sitio web en esta herramienta. Caducidad de 1 a&ntilde;o.</p>

<p>Aceptaci&oacute;n de la Pol&iacute;tica de cookies</p>
<p>SITIO WEB, asume que usted acepta el uso de cookies. No obstante, muestra informaci&oacute;n sobre su Pol&iacute;tica de cookies en la parte inferior o superior de cualquier p&aacute;gina del portal con cada inicio de sesi&oacute;n con el objeto de que usted sea consciente</p>
<p>Ante esta informaci&oacute;n es posible llevar a cabo las siguientes acciones:</p>
<p>&bull; Aceptar cookies: No se volver&aacute; a visualizar este aviso al acceder a cualquier p&aacute;gina del portal durante la presente sesi&oacute;n.</p>
<p>&bull; Salir: Ser&aacute; redirigido fuera del portal.</p>
                    </div>
                </div>
            </div>
        </modal>

    </footer>
</template>

<script>
import store from '../../../store'

  export default { 
    methods: {
        aviso(name){
            this.$modal.show(name);
        },
        ok() {
            this.setCookie('law', true, 2);
            this.$modal.hide('advertencia');
        },
        getCookie: function(name) {
            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        },
        setCookie: function(name, value, minutes) {
            var d = new Date;
            d.setTime(d.getTime() + minutes*60*1000);
            document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
        },
        deleteCookie: function(name) { 
            this.setCookie(name, '', -1); 
        }
    },
    mounted() {
        var c = this.getCookie('law');
        if(c===null) {
            console.log('no hay');
            //this.setCookie('law', true, 2);
            this.$modal.show('advertencia');
        } else {
            console.log('si hay');
        }
    }, 
    computed: {
        show: function() {
            return store.state.toggleFooter;
        }
    }
  }
</script>

<style scoped>
.Cookie {
    background-color:rgb(60,60,60,0.5);
    height: 100%;
}
.der {
    padding-right: 0px;
    margin-right: 0px;
}
.izq {
    text-align: left;
}
.caja-advertencia {
    width: 100%;
    height: auto;
    text-align: right;
    background-color:#ffc850;
    padding:12px;
    border: 2px solid #f8ab04;
    border-radius: 2px;
    margin:auto;
}
.caja-aviso {
    padding:12px;
    overflow-y: scroll;
    height: 500px;
}
.contenedor {
    padding-right:14px;
}
.margen-derecho {
  margin-right: 8px;
}
h4 {
      font-size: 1.2rem;
      color:#666666;
}
h5 {
    border-bottom: 1px solid #666666;
}
.rojo {
  color:#ff0000;
}
.verde {
  color: #27ae60;
}
a {
  color:#27ae60;
}
.kilimanjaro_area {
    position: relative;
    z-index: 1;
	}
	.foo_top_header_one {
    background-color: #15151e;
    color: #fff;
}
.section_padding_100_10 {
    padding-top: 100px;
    padding-bottom: 10px;
}
.foo_top_header_one {
    color: #fff;
}
.kilimanjaro_part {
    margin-bottom: 30px;
}
.foo_top_header_one .kilimanjaro_part > h5 {
    color: #fff;
}
.kilimanjaro_part h4, .kilimanjaro_part h5 {
    margin-bottom: 30px;
    padding-bottom: 10px;
}
.kilimanjaro_single_contact_info > p, .kilimanjaro_single_contact_info > h5, .kilimanjaro_blog_area > a, .foo_top_header_one .kilimanjaro_part > p {
    color: rgba(255,255,255,.5);
}
p, ul li, ol li {
    font-weight: 300;
}
ul {
    margin: 0;
    padding: 0;
}
.kilimanjaro_bottom_header_one {
    background-color: #111;
}
.section_padding_50 {
    padding: 50px 0;
}
.kilimanjaro_bottom_header_one p {
    color: #fff;
    margin: 0;
}
p, ul li, ol li {
    font-weight: 300;
}
.kilimanjaro_bottom_header_one a {
    color: inherit;
    font-size: 14px;
}
a, h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
}
.m-top-15 {
    margin-top: 15px;
}
ul {
    margin: 0;
    padding: 0;
}

.kilimanjaro_widget > li {
    display: inline-block;
}
p, ul li, ol li {
    font-weight: 300;
}
ol li, ul li {
    list-style: outside none none;
}
.kilimanjaro_widget a {
    border: 1px solid #333;
    border-radius: 6px;
    color: #888;
    display: inline-block;
    font-size: 13px;
    margin-bottom: 4px;
    padding: 7px 12px;
}
ul {
    margin: 0;
    padding: 0;
}
.kilimanjaro_links a {
    border-bottom: 1px solid #333;
    color: rgba(255,255,255,.5);
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
    padding-bottom: 10px;
}
.kilimanjaro_links a {
    color: rgba(255,255,255,.5);
    font-size: 13px;
}
top-15 {
    margin-top: 15px;
}
.foo_top_header_one .kilimanjaro_part > h5 {
    color: #fff;
}
.kilimanjaro_part h4, .kilimanjaro_part h5 {
    margin-bottom: 30px;
}
.kilimanjaro_social_links > li {
    display: inline-block;
}
p, ul li, ol li {
    font-weight: 300;
}
.kilimanjaro_social_links a {
    border: 1px solid #333;
    border-radius: 6px;
    color: #888;
    display: inline-block;
    font-size: 13px;
    margin-bottom: 3px;
    padding: 7px 12px;
}
.kilimanjaro_blog_area .kilimanjaro_date {
    color: #27ae60;
    font-size: 13px;
    margin-bottom: 5px;
}
.kilimanjaro_blog_area > p {
    color: rgba(255,255,255,.5);
    line-height: 1.3;
    margin-bottom: 0;
}
.kilimanjaro_works > a {
    display: inline-block;
    float: left;
    position: relative;
    width: 33.33333333%;
    z-index: 1;
}
.kilimanjaro_thumb {
    left: 0;
    position: absolute;
    top: 0;
    width: 75px;
}
.kilimanjaro_links a i {
    padding-right: 10px;
}
  /* :: 18.0 Footer Area CSS */

    .footer_area {
        position: relative;
        z-index: 1;
    }
 .footer_bottom p > i,
    .footer_bottom p > a:hover {
        color: #27ae60;
    }	

    .social_links_area {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding: 50px 0 30px 0;
        text-align: center;
        position: relative;
        z-index: 1;
    }
 .social_links_area > a:hover {
        color: #27ae60;
    }

    .inline-style .social_links_area > a:hover {
        background-color: transparent;
        color: #27ae60;
        border: 0px solid transparent;
    }
 .single_feature:hover .feature_text h4 {
        color: #27ae60;
    }
.kilimanjaro_blog_area {
    border-bottom: 1px solid #333;
    margin-bottom: 15px;
    padding: 0 0 15px 90px;
    position: relative;
    z-index: 1;
}
.kilimanjaro_links a {
    border-bottom: 1px solid #333;
    color: rgba(255,255,255,.5);
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
    padding-bottom: 10px;
}
.btn-outline-danger {
    color:rgb(245, 73, 73);
}
.btn-outline-danger:hover {
    color:#fff;
}
</style>