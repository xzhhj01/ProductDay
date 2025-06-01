import styles from "../../styles/feedback.module.css";

export default function Feedback() {
    return (
        <div className={styles.container}>
            <div className={`container ${styles.contentWrapper}`}>
                <h1 className={styles.pageTitle}>플레이 피드백</h1>

                <div className={`card ${styles.requestCard}`}>
                    <h2 className={styles.cardTitle}>게임 분석 요청하기</h2>
                    <div className={styles.formContainer}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>
                                소환사 이름
                            </label>
                            <input
                                type="text"
                                className={styles.inputField}
                                placeholder="소환사 이름을 입력하세요"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>게임 ID</label>
                            <input
                                type="text"
                                className={styles.inputField}
                                placeholder="분석받고 싶은 게임 ID를 입력하세요"
                            />
                        </div>
                        <button
                            className={`btn btn-accent ${styles.submitButton}`}
                        >
                            분석 요청하기
                        </button>
                    </div>
                </div>

                <div className={`card ${styles.feedbackCard}`}>
                    <h2 className={styles.cardTitle}>최근 피드백</h2>
                    <div className={styles.feedbackList}>
                        <div className={styles.feedbackItem}>
                            <div className={styles.feedbackHeader}>
                                <div className={styles.feedbackContent}>
                                    <h3 className={styles.feedbackTitle}>
                                        아칼리 vs 야스오 매치업
                                    </h3>
                                    <p className={styles.feedbackDescription}>
                                        레벨 6 이후 교전 타이밍을 더 신중하게
                                        잡아야 할 것 같습니다...
                                    </p>
                                </div>
                                <span className={styles.feedbackTime}>
                                    2시간 전
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
