import styles from "./Loading.module.scss"

const Ring = () => {
	return (
		<div className={styles["lds-ring"]}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Ring
