export interface SolicitudEspacio {
  idSolicitud:number,
	idEspacioAcademico:number,
	descripcionEspacioAcademico:string,
	idSolicitante:number,
	dni:number,
	nombres:string,
	apellidoPaterno:string,
	apellidoMaterno:string,
	estadoSolicitud:string,
	descripcionEstadoSolicitud:string,
	tipoSolicitud:string,
	descripcionTipoSolicitud:string,
	motivo:string,
	fechaRegistro:Date,
	fechaReserva:Date,
	horaInicio:string,
	horaFin:string,
	estadoAsistencia:string,
	pabellon:string,
	descripcionPabellon:string,
	idTipoEspacio: string

}
