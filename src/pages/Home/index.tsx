import { useContext, useEffect, useRef, useState } from "react";
import MenuLink from  "../../interfaces/MenuLink";
import Navbar from "../../Components/Navbar";
import Menu from "../../Components/Menu";
import Sidebar from "../../Components/Sidebar";
import DividerBox from "../../Components/DividerBox";
import Searchbar from "../../Components/Searchbar";
import VehicleCard from "../../Components/VehicleCard";
import {LoadingContainer, MapContainer, MenuContainer, NavContainer, SideBarContainer, StyledDiv, VehiclesCardsContainer } from "./style";
import "../../i18n/config";
import { useTranslation } from "react-i18next"
import Vehicle from "../../interfaces/Vehicle";
import Map from "../../Map";
import { AuthContext } from "../../Contexts/AuthContext";
import getClients from "../../services/getClients";
import getAddress, { AddressRequestParams } from "../../services/getAddress";
import { Address } from "../../interfaces/Address";
import Client from "../../interfaces/Client";
import { FormatedVehicle } from "../../interfaces/FormatedVehicle";
import useGetvehicles from "../../hooks/useGetVehicles";
import SearchNotFound from "../../Components/SearchNotFound";
import Loading from "../../Components/Loading";
import FenceSidebar from "../../Components/FenceSidebar";
import LandmarkSidebar from "../../Components/LandmarkSIdeBar";

export default function Home() {
  	const { t } = useTranslation();
  	// const {vehicles} = useGetvehicles();
  	const {authTokens} = useContext(AuthContext);
  	const [resizeMap, setResizeMap] = useState(false);
	const [searchValue, setSearchValue ] = useState("");
	const [formatedVehicles, setFormatedVehicles] = useState<FormatedVehicle[] | []>([]);
	const [searchResults, setSearchResults] = useState<FormatedVehicle[] | []>([]);
	const [cancelAddingFence, setCancelAddingFence] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showFenceSideBar, setShowFenceSideBar] = useState(false);
	const [fenceDescription, setFenceDescription] = useState("");
	const [saveFence, setSaveFence] = useState(false);
	const [showRefSideBar, setShowRefSideBar] = useState(false);
	const [showLandmarkSidebar, setShowLandmarkSidebar] = useState(false);

	const [saveRef, setSaveRef] = useState(false);
	const [cancelAddingRef, setCancelAddingRef] = useState(false);
	const [clients, setClients] = useState<Client[] | null>(null);


	const menu: MenuLink[] = [
		{ label: t("menu_names.dashboard"), href: "#", icon: "dashboard" },
		{ label: t("menu_names.general_map"), href: "#", icon: "world" },
		{ label: t("menu_names.mosaic"), href: "#", icon: "interface" },
		{ label: t("menu_names.relatories"), href: "#", icon: "chart" },
		{ label: t("menu_names.logistic"), href: "#", icon: "navigation" },
		{ label: t("menu_names.driver_behavior"), href: "#", icon: "direction" },
		{ label: t("menu_names.administrative_panel"), href: "#", icon: "briefcase" },
		{ label: t("menu_names.registers"), href: "#", icon: "add" },
		{ label: t("menu_names.settings"), href: "#", icon: "settings" },
	];

	const vehiclesOBJ = [
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.189385,
			-46.840518
		],
		"dt_gps": "09/04/2024 18:04:21",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01316",
			"horimeter": 9659818,
			"consume": 0,
			"odometer": 50993483,
			"plate": "FPR-8428",
			"description": "01316"
		},
		"ativo_id": 208635,
		"direction": 142,
		"is_bloqued": 0,
		"speed": {
			"val": 6,
			"unit_measurement": "km/h"
		},
		"address": "Rua Sebastião Zacarias, 170, Jardim Tamoio, Jundiaí - SP, 13219-520, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.278457,
			-46.730805
		],
		"dt_gps": "09/04/2024 18:04:00",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "BRANCO",
			"producer": "Volkswagem",
			"fuel": "3",
			"model": "9.160 / MARCOPOLO SENIOR ON",
			"ativo_name": "01296",
			"horimeter": 37149960,
			"consume": 0,
			"odometer": 248648009,
			"plate": "FAB-5809",
			"description": "01296"
		},
		"ativo_id": 208641,
		"direction": 165,
		"is_bloqued": 0,
		"speed": {
			"val": 10,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Paulo Brossard, 937, Francisco Morato - SP, 07956-000, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.187377,
			-46.860533
		],
		"dt_gps": "09/04/2024 18:04:00",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "08726",
			"horimeter": 7440700,
			"consume": 0,
			"odometer": 41158280,
			"plate": "ESU5C53",
			"description": "08726"
		},
		"ativo_id": 208646,
		"direction": 330,
		"is_bloqued": 0,
		"speed": {
			"val": 17,
			"unit_measurement": "km/h"
		},
		"address": "Rua Ademir Vieira, Jardim Pacaembu, Jundiaí - SP, 13218-260, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.756284,
			-47.255342
		],
		"dt_gps": "09/04/2024 18:04:02",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "BRANCO",
			"producer": "Volkswagem",
			"fuel": "3",
			"model": "17.230 / COMIL CAMPIONE R",
			"ativo_name": "10836 ",
			"horimeter": 52597179,
			"consume": 0,
			"odometer": 1013769769,
			"plate": "FSG-1858",
			"description": "10836"
		},
		"ativo_id": 218767,
		"direction": 135,
		"is_bloqued": 0,
		"speed": {
			"val": 85,
			"unit_measurement": "km/h"
		},
		"address": "Via Anhanguera, Portal dos Nobres, Americana - SP, 18125-000, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.564699,
			-47.444434
		],
		"dt_gps": "09/04/2024 17:52:14",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "BRANCO",
			"producer": "Volkswagem",
			"fuel": "3",
			"model": "17.230 / COMIL CAMPIONE R",
			"ativo_name": "10846",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FCA-2379 ",
			"description": "10846"
		},
		"ativo_id": 221826,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Carlos Zaccaria, Parque Nossa Senhora das Dores I, Limeira - SP, 13483-110, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.587888,
			-47.375801
		],
		"dt_gps": "09/04/2024 18:03:47",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "BRANCO",
			"producer": "Volkswagem",
			"fuel": "3",
			"model": "17.230 / MARCOPOLO IDEALE R",
			"ativo_name": "10816",
			"horimeter": 48026733,
			"consume": 0,
			"odometer": 741351505,
			"plate": "GHQ-3228",
			"description": "10816"
		},
		"ativo_id": 221841,
		"direction": 277,
		"is_bloqued": 0,
		"speed": {
			"val": 14,
			"unit_measurement": "km/h"
		},
		"address": "Via Antônio Cruanes Filho, Jardim Glória, Limeira - SP, 13487-250, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.559736,
			-47.425893
		],
		"dt_gps": "09/04/2024 18:04:24",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "BRANCO",
			"producer": "Volkswagem",
			"fuel": "3",
			"model": "17.230 / CAIO SOLAR",
			"ativo_name": "10136 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " GAQ-9768  ",
			"description": "10136 "
		},
		"ativo_id": 222169,
		"direction": 282,
		"is_bloqued": 0,
		"speed": {
			"val": 19,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Doutor Fabricio Vampré, Jardim Paulista, Limeira - SP, 13480-664, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.242609,
			-47.05125
		],
		"dt_gps": "09/04/2024 18:04:16",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01536 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FPC-8299 ",
			"description": "01536 "
		},
		"ativo_id": 230481,
		"direction": 320,
		"is_bloqued": 0,
		"speed": {
			"val": 46,
			"unit_measurement": "km/h"
		},
		"address": "Estrada da Fazenda Cachoeira, 133, Itupeva - SP, 13295-000, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.598087,
			-47.40825
		],
		"dt_gps": "09/04/2024 17:33:19",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "09266",
			"horimeter": 5673100,
			"consume": 0,
			"odometer": 33322736,
			"plate": "FEI-1665",
			"description": "09266"
		},
		"ativo_id": 236399,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Monsenhor Luís Fernandes de Abreu, 131, Parque Res Santa Eulália, Limeira - SP, 13481-137, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.400743,
			-46.951671
		],
		"dt_gps": "09/04/2024 17:56:32",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "BRANCO",
			"producer": "Mercedes Benz",
			"fuel": "3",
			"model": "415 / SPRINTER",
			"ativo_name": "1096 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " FRZ-4784 ",
			"description": "1096"
		},
		"ativo_id": 237143,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Nove, 32, Parque do Estado II, Mogi Mirim - SP, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 92460,
		"lat_lng": [
			-23.065287,
			-46.684614
		],
		"dt_gps": "09/04/2024 17:47:44",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01516",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FVZ-0304",
			"description": "01516"
		},
		"ativo_id": 245247,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Morangão Sucos,Lanches e Frutas, Rodovia Edgar Máximo Zambotto, Jarinu - SP, 12952-817, Brasil",
		"client": "Vesper Atibaia"
		},
		{
		"validate": 1,
		"client_id": 92460,
		"lat_lng": [
			-22.349529,
			-47.160225
		],
		"dt_gps": "01/04/2024 13:29:05",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01496 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GGC-3266 ",
			"description": "01496 "
		},
		"ativo_id": 245282,
		"direction": 0,
		"is_bloqued": 1,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Safra Diesel - Bosch, Conchal - SP, 13835-000, Brasil",
		"client": "Vesper Atibaia"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.277555,
			-46.755864
		],
		"dt_gps": "09/04/2024 17:38:31",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "BRANCO",
			"producer": "Volkswagem",
			"fuel": "3",
			"model": "17.230 / COMIL CAMPIONE 3.25",
			"ativo_name": "10716",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FEJ-4499",
			"description": "10716"
		},
		"ativo_id": 269752,
		"direction": 0,
		"is_bloqued": 1,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Machado de Assis, 496, Francisco Morato - SP, 07916-070, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.197496,
			-46.881383
		],
		"dt_gps": "09/04/2024 18:04:09",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "BRANCO",
			"producer": "Volkswagem",
			"fuel": "3",
			"model": "OF 1722 / MARCOPOLO IDEALE R",
			"ativo_name": "10876",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GCE-7335",
			"description": "10876"
		},
		"ativo_id": 270395,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Doutor Odil Campos de Sáes, 215, Vianelo, Jundiaí - SP, 13202-475, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 92460,
		"lat_lng": [
			-23.546476,
			-46.919404
		],
		"dt_gps": "09/04/2024 17:42:21",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01306",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GHP-8360",
			"description": "01306"
		},
		"ativo_id": 271868,
		"direction": 0,
		"is_bloqued": 1,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Ágatas, 498, Itapevi - SP, 06655-180, Brasil",
		"client": "Vesper Atibaia"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.557013,
			-47.369766
		],
		"dt_gps": "09/04/2024 17:50:31",
		"ignition": 0,
		"ativo": {
			"type": 1,
			"color": "Branco",
			"producer": "Volkswagen",
			"fuel": "1",
			"model": "GOL 1.0L MC4",
			"ativo_name": "00059 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " DGY-8866 ",
			"description": "00059 "
		},
		"ativo_id": 295646,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.525648,
			-46.563101
		],
		"dt_gps": "09/04/2024 18:03:40",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "BRANCA",
			"producer": "Mercedes Benz",
			"fuel": "3",
			"model": "O500 RS / IRIZAR PB I6",
			"ativo_name": "09346 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 323633300,
			"plate": "   FQL4B91",
			"description": "09346 "
		},
		"ativo_id": 301233,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Condessa Elizabeth de Robiano, 2640, Avenida Condessa Elisabeth de Robiano, 2642, Tatuapé, São Paulo - SP, 03086-035, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.164875,
			-46.758223
		],
		"dt_gps": "09/04/2024 17:40:40",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01416",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FYQ-2079",
			"description": "01416"
		},
		"ativo_id": 303170,
		"direction": 232,
		"is_bloqued": 0,
		"speed": {
			"val": 54,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Edgar Máximo Zambotto, Jarinu - SP, 13240-000, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.141055,
			-46.916841
		],
		"dt_gps": "09/04/2024 17:44:31",
		"ignition": 0,
		"ativo": {
			"type": 2,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "00064",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "EQN-4540",
			"description": "00064"
		},
		"ativo_id": 303357,
		"direction": 0,
		"is_bloqued": 1,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.588115,
			-47.406168
		],
		"dt_gps": "09/04/2024 18:04:20",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10256 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "CSK-2662 ",
			"description": "10256 "
		},
		"ativo_id": 311908,
		"direction": 199,
		"is_bloqued": 0,
		"speed": {
			"val": 20,
			"unit_measurement": "km/h"
		},
		"address": "Rua Doutor Willian Silva, 326, Parque Nações, Limeira - SP, 13481-013, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 92460,
		"lat_lng": [
			-23.065196,
			-46.684279
		],
		"dt_gps": "09/04/2024 17:50:34",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10686",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GFR-8547",
			"description": "10686"
		},
		"ativo_id": 312029,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Edgar Máximo Zambotto, Ponte Alta, Atibaia - SP, 12952-817, Brasil",
		"client": "Vesper Atibaia"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.575151,
			-47.156502
		],
		"dt_gps": "09/04/2024 17:55:32",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "9316 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FEI-1659 ",
			"description": "9316"
		},
		"ativo_id": 313484,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Dario Custódio dos Santos, 199, Artur Nogueira - SP, 13163-338, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.262729,
			-46.746772
		],
		"dt_gps": "09/04/2024 17:58:22",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "08976",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " EFO-9261",
			"description": "08976"
		},
		"ativo_id": 314186,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Princesa Isabel, 1949, Francisco Morato - SP, 07941-000, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.146024,
			-46.991358
		],
		"dt_gps": "09/04/2024 17:59:23",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01396",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GHQ-4489",
			"description": "01396"
		},
		"ativo_id": 314695,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Francisco Alves Rodrigues, 13, Novo Horizonte, Jundiaí - SP, 13212-575, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.166661,
			-46.905571
		],
		"dt_gps": "09/04/2024 18:04:17",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01476",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GJP-6336",
			"description": "01476"
		},
		"ativo_id": 314868,
		"direction": 351,
		"is_bloqued": 0,
		"speed": {
			"val": 37,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Vereador Geraldo Dias, Hortolândia, Jundiaí - SP, 13214-040, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.07443,
			-46.999569
		],
		"dt_gps": "09/04/2024 17:19:31",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01546",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "PQP-2406",
			"description": "01546"
		},
		"ativo_id": 315204,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Comendador João Lucas, Vinhedo - SP, 13288-184, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.489,
			-47.458143
		],
		"dt_gps": "09/04/2024 17:42:16",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10786",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GYS-6686",
			"description": "10786"
		},
		"ativo_id": 316233,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Aristeu Marcicano, Cordeirópolis - SP, 13490-000, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.172407,
			-46.94671
		],
		"dt_gps": "09/04/2024 18:03:58",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10916 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " FUW-7079 ",
			"description": "10916 "
		},
		"ativo_id": 319263,
		"direction": 61,
		"is_bloqued": 0,
		"speed": {
			"val": 10,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Marginal, 56, Aeroporto, Jundiaí - SP, 13215-085, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.897778,
			-47.171919
		],
		"dt_gps": "21/02/2024 14:52:46",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10026",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "CSK-2743",
			"description": "10026"
		},
		"ativo_id": 324520,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Vergílio Pompeu de Camargo, 629, Jardim Santa Izabel, Hortolândia - SP, 13185-210, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.897797,
			-47.172044
		],
		"dt_gps": "20/02/2024 09:38:48",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "09876",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " CSK-2733",
			"description": "09876"
		},
		"ativo_id": 327106,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Espetinho do Tio Ze, Rua Vergílio Pompeu de Camargo, 389, Jardim Santa Izabel, Hortolândia - SP, 13185-210, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.42568,
			-46.825407
		],
		"dt_gps": "09/04/2024 18:02:04",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10996",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "EPU-2800",
			"description": "10996"
		},
		"ativo_id": 328777,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Yolanda Mahaly, 970, Colinas, Santana de Parnaíba - SP, 06537-060, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.182758,
			-46.967944
		],
		"dt_gps": "09/04/2024 18:04:08",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10966",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "PQS-3906",
			"description": "10966"
		},
		"ativo_id": 329343,
		"direction": 249,
		"is_bloqued": 0,
		"speed": {
			"val": 42,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Dom Gabriel Paulino Bueno Couto, Fazenda Grande, Jundiaí - SP, 13212-240, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.578536,
			-47.505578
		],
		"dt_gps": "09/04/2024 17:35:18",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "09116",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "ESU-5952",
			"description": "09116"
		},
		"ativo_id": 330697,
		"direction": 265,
		"is_bloqued": 0,
		"speed": {
			"val": 64,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Doutor João Mendes da Silva Junior, Iracemápolis - SP, 13495-000, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.475088,
			-46.899784
		],
		"dt_gps": "09/04/2024 16:14:50",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "01646  ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "  EKU-8488 ",
			"description": "01646  "
		},
		"ativo_id": 331016,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua das Bananeiras, 1063, Parque Santana, Santana de Parnaíba - SP, 06515-005, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 136081,
		"lat_lng": [
			-22.727062,
			-47.327157
		],
		"dt_gps": "03/04/2024 11:02:19",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "09356",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FTV-9703  B",
			"description": "09356"
		},
		"ativo_id": 335919,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Bandeirantes, 4100, Vila Cordenonsi, Americana - SP, 13478-000, Brasil",
		"client": "Vesper Americana"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.144606,
			-46.938455
		],
		"dt_gps": "09/04/2024 18:04:16",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "01526 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FPL-4558 ",
			"description": "01526 "
		},
		"ativo_id": 336663,
		"direction": 74,
		"is_bloqued": 1,
		"speed": {
			"val": 23,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Professor Pedro Clarismundo Fornari, 155, Cecap, Jundiaí - SP, 13214-660, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.141226,
			-46.917246
		],
		"dt_gps": "09/04/2024 17:26:28",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01366",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FXC-9399",
			"description": "01366"
		},
		"ativo_id": 336670,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.213621,
			-46.840058
		],
		"dt_gps": "09/04/2024 13:40:37",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10746",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GDD-0588",
			"description": "10746"
		},
		"ativo_id": 341810,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Bertioga, Várzea Paulista - SP, 13225-000, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.557179,
			-47.369536
		],
		"dt_gps": "09/04/2024 17:56:29",
		"ignition": 0,
		"ativo": {
			"type": 1,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01676",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "BSZ-7527",
			"description": "01676"
		},
		"ativo_id": 346278,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.564022,
			-47.378614
		],
		"dt_gps": "09/04/2024 18:02:57",
		"ignition": 0,
		"ativo": {
			"type": 1,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01686",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "EUP-3910",
			"description": "01686"
		},
		"ativo_id": 346279,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Pierina C. Henrique, 277, Jardim Boa Esperança, Limeira - SP, 13486-458, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.55729,
			-47.369275
		],
		"dt_gps": "09/04/2024 18:04:11",
		"ignition": 1,
		"ativo": {
			"type": 1,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01656",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "EJX-8823",
			"description": "01656"
		},
		"ativo_id": 346281,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 3,
			"unit_measurement": "km/h"
		},
		"address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.616877,
			-47.41094
		],
		"dt_gps": "09/04/2024 17:59:39",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01666",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FVY-2275",
			"description": "01666"
		},
		"ativo_id": 346378,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Antônio Ferrari, 1164, Jardim Lagoa Nova, Limeira - SP, 13481-771, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.141282,
			-46.917254
		],
		"dt_gps": "09/04/2024 17:41:19",
		"ignition": 0,
		"ativo": {
			"type": 1,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "11046",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "EXJ-6738",
			"description": "11046"
		},
		"ativo_id": 347257,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.223369,
			-46.847676
		],
		"dt_gps": "09/04/2024 18:04:19",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "11196",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "DFT-7E04",
			"description": "11196"
		},
		"ativo_id": 351345,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua do Tanque Velho, 647, Várzea Paulista - SP, 13225-600, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.188209,
			-46.847092
		],
		"dt_gps": "09/04/2024 18:04:16",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01596",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "PQP-2736",
			"description": "01596"
		},
		"ativo_id": 368876,
		"direction": 41,
		"is_bloqued": 1,
		"speed": {
			"val": 16,
			"unit_measurement": "km/h"
		},
		"address": "Rua Florindo Zambon, 1275, Jardim Tamoio, Jundiaí - SP, 13219-380, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.197247,
			-46.881375
		],
		"dt_gps": "09/04/2024 18:04:13",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10926",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "PQS-3166",
			"description": "10926"
		},
		"ativo_id": 376284,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Doutor Odil Campos de Sáes, 173, Vianelo, Jundiaí - SP, 13202-475, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.188335,
			-46.942625
		],
		"dt_gps": "09/04/2024 17:57:19",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "07936 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " DPE-0924 ",
			"description": "07936 "
		},
		"ativo_id": 376365,
		"direction": 64,
		"is_bloqued": 0,
		"speed": {
			"val": 46,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Antônio Pincinato, 1963, Jundiaí - SP, 13211-771, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.32897,
			-46.709933
		],
		"dt_gps": "09/04/2024 17:58:16",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10986",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "PQU-6784",
			"description": "10986"
		},
		"ativo_id": 377119,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua José Primo Lerussi, 824, Franco da Rocha - SP, 07858-020, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.234055,
			-46.850857
		],
		"dt_gps": "09/04/2024 18:04:14",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10946",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "PQS-3346",
			"description": "10946"
		},
		"ativo_id": 377462,
		"direction": 8,
		"is_bloqued": 0,
		"speed": {
			"val": 14,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Manacá, 569, Jundiaí - SP, 13225-350, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.141297,
			-46.917267
		],
		"dt_gps": "09/04/2024 17:37:04",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10736",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GDU-6290 ",
			"description": "10736"
		},
		"ativo_id": 377556,
		"direction": 0,
		"is_bloqued": 1,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.206176,
			-46.831311
		],
		"dt_gps": "09/04/2024 17:51:38",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "09496",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FUD-4773",
			"description": "09496"
		},
		"ativo_id": 378221,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Marginal Rio Jundiaí, 800, Várzea Paulista - SP, 13221-800, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.141537,
			-46.917118
		],
		"dt_gps": "27/02/2024 03:23:30",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10266",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "CSK-2665",
			"description": "10266"
		},
		"ativo_id": 378611,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.174901,
			-46.898743
		],
		"dt_gps": "09/04/2024 18:04:24",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10826",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FNB-6467",
			"description": "10826"
		},
		"ativo_id": 384932,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Antônio Frederico Ozanan, Hortolândia, Jundiaí - SP, 13214-026, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.153307,
			-46.961063
		],
		"dt_gps": "09/04/2024 18:04:12",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "BRANCA",
			"producer": "Volkswagem",
			"fuel": "1",
			"model": "MPOLO SENIOR",
			"ativo_name": "01436",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GEN-1779 ",
			"description": "01436"
		},
		"ativo_id": 385187,
		"direction": 299,
		"is_bloqued": 0,
		"speed": {
			"val": 9,
			"unit_measurement": "km/h"
		},
		"address": "Rua Adelino Martins, 749, Tulipa, Jundiaí - SP, 13212-600, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.506134,
			-47.429633
		],
		"dt_gps": "09/04/2024 17:24:18",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01696",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " DEN-3589",
			"description": "01696"
		},
		"ativo_id": 392531,
		"direction": 7,
		"is_bloqued": 0,
		"speed": {
			"val": 93,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia dos Bandeirantes, Cordeirópolis - SP, 13490-000, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.564953,
			-47.454781
		],
		"dt_gps": "09/04/2024 18:03:57",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01706",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " DST-8769",
			"description": "01706"
		},
		"ativo_id": 392532,
		"direction": 355,
		"is_bloqued": 0,
		"speed": {
			"val": 44,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Prefeito Ary Levy Pereira, Jardim Res Abílio Pedro IV, Limeira - SP, 13483-121, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 157645,
		"lat_lng": [
			-22.974746,
			-47.122878
		],
		"dt_gps": "09/04/2024 17:57:06",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "61223",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "OIM-8697",
			"description": "61223"
		},
		"ativo_id": 399924,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Luiz Alves de Souza Camargo, 258, DIC II, Campinas - SP, 13054-204, Brasil",
		"client": "ByBus"
		},
		{
		"validate": 1,
		"client_id": 157645,
		"lat_lng": [
			-22.449796,
			-46.980708
		],
		"dt_gps": "02/04/2024 15:38:56",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "61206",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "OIL5B07",
			"description": "61206"
		},
		"ativo_id": 401522,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Luiz Gonzaga, 232, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
		"client": "ByBus"
		},
		{
		"validate": 1,
		"client_id": 157645,
		"lat_lng": [
			-22.460473,
			-46.977436
		],
		"dt_gps": "09/04/2024 18:04:27",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "61102",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "ELW-3D34",
			"description": "61102"
		},
		"ativo_id": 401935,
		"direction": 211,
		"is_bloqued": 0,
		"speed": {
			"val": 19,
			"unit_measurement": "km/h"
		},
		"address": "Rua Pedro Teruel, Parque Real, Mogi Mirim - SP, 13803-095, Brasil",
		"client": "ByBus"
		},
		{
		"validate": 0,
		"client_id": 157645,
		"lat_lng": [
			-23.1411,
			-46.917045
		],
		"dt_gps": "28/03/2024 12:12:20",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "61104",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "ELW-3354",
			"description": "61104"
		},
		"ativo_id": 402065,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
		"client": "ByBus"
		},
		{
		"validate": 1,
		"client_id": 157645,
		"lat_lng": [
			-22.347859,
			-46.957432
		],
		"dt_gps": "09/04/2024 18:01:25",
		"ignition": 0,
		"ativo": {
			"type": 1,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "61802",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FFJ-3789",
			"description": "61802"
		},
		"ativo_id": 402861,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Oscar Martini, 34, Mogi Guaçu - SP, Brasil",
		"client": "ByBus"
		},
		{
		"validate": 1,
		"client_id": 157645,
		"lat_lng": [
			-22.449681,
			-46.980105
		],
		"dt_gps": "09/04/2024 18:04:05",
		"ignition": 1,
		"ativo": {
			"type": 1,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "61808",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FIW-4G99",
			"description": "61808"
		},
		"ativo_id": 403696,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Luiz Gonzaga, 222, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
		"client": "ByBus"
		},
		{
		"validate": 1,
		"client_id": 157645,
		"lat_lng": [
			-22.449829,
			-46.980674
		],
		"dt_gps": "30/03/2024 17:04:34",
		"ignition": 0,
		"ativo": {
			"type": 1,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "61803",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FTK-8209",
			"description": "61803"
		},
		"ativo_id": 404277,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Luiz Gonzaga, 232, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-011, Brasil",
		"client": "ByBus"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.178608,
			-46.908668
		],
		"dt_gps": "09/04/2024 18:04:18",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01276",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FYI-2958",
			"description": "01276"
		},
		"ativo_id": 406781,
		"direction": 92,
		"is_bloqued": 0,
		"speed": {
			"val": 31,
			"unit_measurement": "km/h"
		},
		"address": "Rua do Retiro, 2481, Retiro, Jundiaí - SP, 13209-355, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-22.877746,
			-47.130617
		],
		"dt_gps": "09/04/2024 18:03:54",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "01716 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "  ESP-1688",
			"description": "01716"
		},
		"ativo_id": 408062,
		"direction": 353,
		"is_bloqued": 0,
		"speed": {
			"val": 87,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Adalberto Panzan, Parque Via Norte, Campinas - SP, 13069-105, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 157645,
		"lat_lng": [
			-22.449977,
			-46.979647
		],
		"dt_gps": "09/04/2024 17:42:28",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "61204",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "OIF-7D07",
			"description": "61204"
		},
		"ativo_id": 409393,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Antônio Guerreiro Perez, 255, Jardim Maria Beatriz, Mogi Mirim - SP, 13803-010, Brasil",
		"client": "ByBus"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.283698,
			-46.732954
		],
		"dt_gps": "09/04/2024 17:48:59",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "09036",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "EZU-9033",
			"description": "09036"
		},
		"ativo_id": 412529,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Rosemary Ferreira Matos, 641, Francisco Morato - SP, 07991-060, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 92460,
		"lat_lng": [
			-23.110867,
			-46.557103
		],
		"dt_gps": "09/04/2024 18:04:07",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01746",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GGC3E57",
			"description": "01746"
		},
		"ativo_id": 415430,
		"direction": 84,
		"is_bloqued": 0,
		"speed": {
			"val": 25,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Gerônimo de Camargo, 3995, Centro, Atibaia - SP, 12940-213, Brasil",
		"client": "Vesper Atibaia"
		},
		{
		"validate": 1,
		"client_id": 92460,
		"lat_lng": [
			-23.39157,
			-46.83552
		],
		"dt_gps": "09/04/2024 18:04:12",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01456",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FJB-1218",
			"description": "01456"
		},
		"ativo_id": 415679,
		"direction": 172,
		"is_bloqued": 0,
		"speed": {
			"val": 94,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Anhanguera, Cajamar - SP, 07750-000, Brasil",
		"client": "Vesper Atibaia"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.547223,
			-47.35962
		],
		"dt_gps": "09/04/2024 18:04:02",
		"ignition": 1,
		"ativo": {
			"type": 1,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "00068",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FCO7C54",
			"description": "00068 FCO7B54"
		},
		"ativo_id": 415904,
		"direction": 96,
		"is_bloqued": 0,
		"speed": {
			"val": 93,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Engenheiro João Tosello, Jardim Nova Limeira, Limeira - SP, 13486-264, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.1179,
			-46.574825
		],
		"dt_gps": "09/04/2024 17:37:41",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01766",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GJT-3E57",
			"description": "01766"
		},
		"ativo_id": 432557,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Hélio Fazzio, 169, Alvinópolis, Atibaia - SP, 12951-732, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.217988,
			-46.866205
		],
		"dt_gps": "09/04/2024 18:04:13",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01786",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "DMG-2G59",
			"description": "01786"
		},
		"ativo_id": 436679,
		"direction": 156,
		"is_bloqued": 0,
		"speed": {
			"val": 24,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Professora Leonita Faber Ladeira, 1231, Jardim do Lago, Jundiaí - SP, 13203-770, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.141197,
			-46.917121
		],
		"dt_gps": "09/04/2024 17:37:34",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "08666",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "ESU4I18",
			"description": "08666"
		},
		"ativo_id": 438667,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.587534,
			-47.389932
		],
		"dt_gps": "09/04/2024 18:04:18",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01566",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " PQP-2546",
			"description": "01566"
		},
		"ativo_id": 445714,
		"direction": 298,
		"is_bloqued": 0,
		"speed": {
			"val": 41,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Vitorino Arigone, Jardim Santa Bárbara, Limeira - SP, 13480-309, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.556969,
			-47.369495
		],
		"dt_gps": "09/04/2024 15:31:36",
		"ignition": 0,
		"ativo": {
			"type": 2,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "00066",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "BJX6C49",
			"description": "00066"
		},
		"ativo_id": 445765,
		"direction": 21,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rododiesel Oficina Mecânica, Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 175573,
		"lat_lng": [
			-18.141245,
			-49.044743
		],
		"dt_gps": "09/04/2024 17:52:07",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "08616  ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "  ESU4I20  ",
			"description": "08616   "
		},
		"ativo_id": 449310,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Goiás, 830, Buriti Alegre - GO, 75660-000, Brasil",
		"client": "ByBus Buriti"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.337402,
			-46.921641
		],
		"dt_gps": "09/04/2024 18:04:13",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10866",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FQL-0B88",
			"description": "10866"
		},
		"ativo_id": 449442,
		"direction": 2,
		"is_bloqued": 0,
		"speed": {
			"val": 33,
			"unit_measurement": "km/h"
		},
		"address": "Avenida José Rodrigues Netto, 1468, Mogi Guaçu - SP, 13848-310, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.556845,
			-47.368861
		],
		"dt_gps": "09/04/2024 17:50:13",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "11006 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " BWV-3070",
			"description": "11006 "
		},
		"ativo_id": 449735,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Anhanguera, Jardim Nova Limeira, Limeira - SP, 13486-850, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.214318,
			-46.816988
		],
		"dt_gps": "09/04/2024 18:03:44",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "01346 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " GJG-0758 ",
			"description": "01346 "
		},
		"ativo_id": 455055,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua José Mafassoli, 433, Várzea Paulista - SP, 13223-050, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 157645,
		"lat_lng": [
			-22.348015,
			-46.957158
		],
		"dt_gps": "09/04/2024 18:02:23",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "61026 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "EPU-6972 ",
			"description": "61026 "
		},
		"ativo_id": 461989,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Deputado Mário Beni, Mogi Guaçu - SP, Brasil",
		"client": "ByBus"
		},
		{
		"validate": 1,
		"client_id": 136081,
		"lat_lng": [
			-22.746226,
			-47.320615
		],
		"dt_gps": "09/04/2024 18:04:12",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10726",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GEB-2499",
			"description": "10726"
		},
		"ativo_id": 463906,
		"direction": 287,
		"is_bloqued": 0,
		"speed": {
			"val": 32,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Bandeirantes, Werner Plaas, Americana - SP, 13478-700, Brasil",
		"client": "Vesper Americana"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.192599,
			-46.930836
		],
		"dt_gps": "09/04/2024 18:03:49",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01726",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "CPU-4927",
			"description": "01726"
		},
		"ativo_id": 465341,
		"direction": 162,
		"is_bloqued": 0,
		"speed": {
			"val": 76,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia dos Bandeirantes, Gramadão, Jundiaí - SP, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.556468,
			-47.369218
		],
		"dt_gps": "09/04/2024 17:38:32",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "09276",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FEI-1482",
			"description": "09276"
		},
		"ativo_id": 467827,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Anhanguera, Jardim Nova Limeira, Limeira - SP, 13486-850, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.603335,
			-47.394149
		],
		"dt_gps": "09/04/2024 18:04:02",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01446",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FIG-5919",
			"description": "01446"
		},
		"ativo_id": 469430,
		"direction": 117,
		"is_bloqued": 0,
		"speed": {
			"val": 31,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Palmyra Loureiro Ramos, Jardim Campo Verde I, Limeira - SP, 13481-466, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.524472,
			-46.575863
		],
		"dt_gps": "09/04/2024 17:42:59",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "09446",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FYQ-6277",
			"description": "09446"
		},
		"ativo_id": 470681,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Tuiuti, 11, Vila Maria, São Paulo - SP, 03081-000, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.353819,
			-46.847596
		],
		"dt_gps": "09/04/2024 18:04:20",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10936 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "PQS-3246",
			"description": "10936"
		},
		"ativo_id": 471387,
		"direction": 191,
		"is_bloqued": 0,
		"speed": {
			"val": 72,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Anhanguera, Cajamar - SP, 07789-100, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.141408,
			-46.91732
		],
		"dt_gps": "09/04/2024 17:58:43",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "11156 B",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FFW-1274  B",
			"description": "11156  B"
		},
		"ativo_id": 472178,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Vereador Geraldo Dias, 3115, Cecap, Jundiaí - SP, 13214-788, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.276389,
			-47.057503
		],
		"dt_gps": "09/04/2024 17:57:36",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10006",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "CSK-2715",
			"description": "10006"
		},
		"ativo_id": 472665,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Argentina, 358, Cabreúva - SP, 13315-000, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.208199,
			-46.82843
		],
		"dt_gps": "09/04/2024 17:48:40",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "08516",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "EGK-9902",
			"description": "08516"
		},
		"ativo_id": 472827,
		"direction": 92,
		"is_bloqued": 0,
		"speed": {
			"val": 59,
			"unit_measurement": "km/h"
		},
		"address": "Avenida Marginal Rio Jundiaí, Várzea Paulista - SP, 13221-800, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 86155,
		"lat_lng": [
			-23.142193,
			-46.917465
		],
		"dt_gps": "09/04/2024 17:43:57",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01586",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "PQP-2616",
			"description": "01586"
		},
		"ativo_id": 473155,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Nelson Martinho, Cecap, Jundiaí - SP, 13214-718, Brasil",
		"client": "Vesper Jundiai"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.567746,
			-47.391192
		],
		"dt_gps": "09/04/2024 18:04:15",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10476",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "HGJ-2E42",
			"description": "10476"
		},
		"ativo_id": 475360,
		"direction": 166,
		"is_bloqued": 0,
		"speed": {
			"val": 8,
			"unit_measurement": "km/h"
		},
		"address": "Rua Lopes Trovão, 24, Vila Santa Lúcia, Limeira - SP, 13486-063, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.563544,
			-47.424363
		],
		"dt_gps": "09/04/2024 17:33:21",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10656",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "OWI-5017",
			"description": "10656"
		},
		"ativo_id": 477345,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Joaquim Daniel dos Santos, 831, Bairro Graminha, Limeira - SP, 13482-384, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.581369,
			-47.402225
		],
		"dt_gps": "09/04/2024 18:03:33",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "08886",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "EFO-9279",
			"description": "08886"
		},
		"ativo_id": 480505,
		"direction": 283,
		"is_bloqued": 0,
		"speed": {
			"val": 11,
			"unit_measurement": "km/h"
		},
		"address": "Rua Senador Joaquim Antônio A. Penteado, 528, Jardim Santa Lina, Limeira - SP, 13480-505, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.602919,
			-47.423516
		],
		"dt_gps": "09/04/2024 18:04:23",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "01556",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " PQP-2496",
			"description": "01556"
		},
		"ativo_id": 480671,
		"direction": 196,
		"is_bloqued": 0,
		"speed": {
			"val": 15,
			"unit_measurement": "km/h"
		},
		"address": "Rua José Pintarelli, 167, Jardim Palmeiras, Limeira - SP, 13481-685, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 92460,
		"lat_lng": [
			-23.034145,
			-46.733491
		],
		"dt_gps": "09/04/2024 18:04:14",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "00073 ",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": " GHE2B98 ",
			"description": "00073 "
		},
		"ativo_id": 483680,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Antônio Gilberto Frediani, Real Parque Dom Pedro I, Itatiba - SP, 13254-896, Brasil",
		"client": "Vesper Atibaia"
		},
		{
		"validate": 1,
		"client_id": 157645,
		"lat_lng": [
			-22.504986,
			-46.985833
		],
		"dt_gps": "09/04/2024 18:04:10",
		"ignition": 1,
		"ativo": {
			"type": 1,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "00074",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "FMD5G24",
			"description": "00074"
		},
		"ativo_id": 484692,
		"direction": 340,
		"is_bloqued": 0,
		"speed": {
			"val": 51,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Adhemar de Barros, Mogi Mirim - SP, Brasil",
		"client": "ByBus"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.946943,
			-47.28028
		],
		"dt_gps": "13/03/2024 10:07:56",
		"ignition": 0,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "",
			"model": "",
			"ativo_name": "00041",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "GDR-6511 ",
			"description": "00041"
		},
		"ativo_id": 488123,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Rua Paschoal de Lucas, 150, Monte Mor - SP, 13190-000, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.556131,
			-47.373526
		],
		"dt_gps": "09/04/2024 18:04:11",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "11406",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "PUU-2482",
			"description": "11406"
		},
		"ativo_id": 488136,
		"direction": 0,
		"is_bloqued": 0,
		"speed": {
			"val": 0,
			"unit_measurement": "km/h"
		},
		"address": "Select Print, Avenida Doutor Hipólito Pinto Ribeiro, Bairro Pires, Limeira - SP, 13486-317, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-21.602125,
			-48.399464
		],
		"dt_gps": "09/04/2024 18:04:16",
		"ignition": 1,
		"ativo": {
			"type": 1,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "11416",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "PUU-8419",
			"description": "11416"
		},
		"ativo_id": 488810,
		"direction": 25,
		"is_bloqued": 0,
		"speed": {
			"val": 12,
			"unit_measurement": "km/h"
		},
		"address": "Avenida José Gonçalves, 2280, Matão - SP, 15995-238, Brasil",
		"client": "Vesper Limeira"
		},
		{
		"validate": 1,
		"client_id": 87222,
		"lat_lng": [
			-22.568686,
			-47.44438
		],
		"dt_gps": "09/04/2024 18:04:05",
		"ignition": 1,
		"ativo": {
			"type": 4,
			"color": "",
			"producer": "",
			"fuel": "1",
			"model": "",
			"ativo_name": "10616",
			"horimeter": 0,
			"consume": 0,
			"odometer": 0,
			"plate": "CSK-2863",
			"description": "10616"
		},
		"ativo_id": 488953,
		"direction": 77,
		"is_bloqued": 0,
		"speed": {
			"val": 63,
			"unit_measurement": "km/h"
		},
		"address": "Rodovia Doutor João Mendes da Silva Junior, Chácara Boa Vista da Graminha, Limeira - SP, Brasil",
		"client": "Vesper Limeira"
		}
	]

	const isFirstRender = useRef(true);
	
	// useEffect(() => {
	//   if(isFirstRender.current) {
	//     setIsLoading(true);
	//     async function getAllData() {
	//       if(authTokens) {
	//           if(vehicles) {
	//               const clients: Client[] = await getClients(authTokens.authToken);
	//               setClients(clients);

	//               const addressData: AddressRequestParams[] = vehicles.map((vehicle: Vehicle) => {
	//                 const addressParams: AddressRequestParams = {              
	//                   "code": vehicle.ativo_id,
	//                   "latitude": vehicle.lat_lng[0].toString(),
	//                   "longitude": vehicle.lat_lng[1].toString(),
	//                 }
	//                 return addressParams;
	//               });
			
	//               const address: Address[] = await getAddress(authTokens.authToken, addressData);
			
	//               const forrmatedVehicles: FormatedVehicle[] = vehicles.map((vehicle: Vehicle) => {
	//                 const vehicleAddress: Address = address.filter((address: Address) => address.code == vehicle.ativo_id)[0];
	//                 const vehicleCLient: Client = clients.filter((client: Client) => client.client_id === vehicle.client_id)[0];
	//                 return {
	//                   ...vehicle,
	//                   address: vehicleAddress ? vehicleAddress.label : t("not_specified") ,
	//                   client: vehicleCLient.client_description
	//                 }
	//               });
					
					
	//               setFormatedVehicles(forrmatedVehicles.slice(0,100));
	//               console.log(formatedVehicles)
	//               setIsLoading(false);
	//           }
	//       }
	//     }
			
	//     getAllData();
			
	//   }
	// }, [vehicles]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {

		const newSearchValue = event.target.value;
		setSearchValue(newSearchValue);
		
		const filteredVehicles = formatedVehicles?.filter((vehicle: FormatedVehicle) => 
		vehicle.ativo.ativo_name.toLowerCase().startsWith(newSearchValue.toLowerCase())
		);

	
		setSearchResults([...filteredVehicles]);
		
		
	}

		const handleSearch = () => console.log(searchValue);

	const handleToggleSidebar = () => {
		setResizeMap(previous => !previous);

	}

	const handleFenceSidebarClose = () => {
		setCancelAddingFence((previous) => !previous);
		setShowFenceSideBar(false);
	}

	const handleRefSidebarClose = () => {
		setCancelAddingRef((previous) => !previous);
		setShowRefSideBar(false);
	}

	const handleShowFenceSidebar = () => {
		setShowFenceSideBar(true);
		setCancelAddingFence(false);
		setResizeMap(previous => !previous);
	}

	const handleShowLandmarkSidebar = () => {
		setShowLandmarkSidebar(true);
		setCancelAddingRef(false);
		setResizeMap(previous => !previous);
	}

	const onFenceDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const description = event.target.value;
		setFenceDescription(description);
	}


	const handleFanceSave = () => {
		setSaveFence((previous) => !previous);
		setShowFenceSideBar(false);
		setResizeMap(previous => !previous);
	}

	const handleLandmarkSave = () => {
		setSaveRef((previous) => !previous);
		setShowLandmarkSidebar(false);
		setResizeMap(previous => !previous);
	}

	return (
		<StyledDiv>
		<NavContainer>
		<Navbar />
		</NavContainer>
			
		<MenuContainer>
			<Menu 
			menuLinks={menu}
			/>
		</MenuContainer>

		<SideBarContainer>
			<Sidebar onClick={handleToggleSidebar}>
			<DividerBox>
				<Searchbar
				placeholder={t("searchbar_placeholder")}
				value={searchValue}
				onChange={handleSearchChange}
				handleSearch={handleSearch}
				/>
			</DividerBox>

			<VehiclesCardsContainer>
				{(!isLoading && !searchValue) && formatedVehicles.map((vehicle: FormatedVehicle) => 
					<DividerBox key={vehicle.ativo_id}>
					<VehicleCard vehicle={vehicle}></VehicleCard>
					</DividerBox>
				)}

				{(!isLoading && searchValue) && searchResults.map((vehicle: FormatedVehicle) => 
					<DividerBox key={vehicle.ativo_id}>
					<VehicleCard vehicle={vehicle}></VehicleCard>
					</DividerBox>
				)}

				{(searchValue && searchResults.length === 0) && <SearchNotFound />}

			{isLoading && 
				<LoadingContainer>
					<Loading />
				</LoadingContainer>
				}
				
			</VehiclesCardsContainer>
			</Sidebar>

			{showFenceSideBar && 
			<FenceSidebar 
				onClose={handleFenceSidebarClose}
				onSave={handleFanceSave}
				onDescChange={onFenceDescChange}
			/>
			}
			{showLandmarkSidebar && 
			<LandmarkSidebar
				onClose={handleRefSidebarClose}
				onSave={handleLandmarkSave}
				clients={[
				{ client_id: 1, client_description: "Cliente A" },
				{ client_id: 2, client_description: "Cliente B" },
				{ client_id: 3, client_description: "Cliente X" },
				{ client_id: 4, client_description: "Empresa Y" },
				{ client_id: 5, client_description: "Loja Z" },
				{ client_id: 6, client_description: "Distribuidora W" },
				{ client_id: 7, client_description: "Restaurante M" },
				{ client_id: 8, client_description: "Fábrica N" },
				{ client_id: 9, client_description: "Hospital P" },
				{ client_id: 10, client_description: "Escola Q" },
				]}
			/>
			}
		</SideBarContainer>
		<MapContainer>
			{
			<Map 
				size={resizeMap}
				apikey="v3XFar3gKIuWv7fn4sNSVWtQy9MD9-yq5rCh5f0tpfA"
				vehicles={formatedVehicles}
				cancelAddingFence={cancelAddingFence}
				showFenceSidebar={handleShowFenceSidebar}
				fenceData={{description: fenceDescription}}
				saveFence={saveFence}
				cancelAddingRefPoint={cancelAddingRef}
				showRefPointSidebar={handleShowLandmarkSidebar}
			/> 
			}
		</MapContainer>
		
		</StyledDiv>
	)
	}
