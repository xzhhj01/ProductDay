export default function Feedback() {
    return (
        <div style={{ minHeight: "100vh", padding: "var(--spacing-2xl)" }}>
            <div className="container" style={{ maxWidth: "800px" }}>
                <h1 style={{ marginBottom: "var(--spacing-2xl)" }}>
                    플레이 피드백
                </h1>

                <div
                    className="card"
                    style={{
                        padding: "var(--spacing-xl)",
                        marginBottom: "var(--spacing-xl)",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "20px",
                            fontWeight: 600,
                            marginBottom: "var(--spacing-lg)",
                        }}
                    >
                        게임 분석 요청하기
                    </h2>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--spacing-lg)",
                        }}
                    >
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "var(--text-secondary)",
                                    marginBottom: "var(--spacing-xs)",
                                }}
                            >
                                소환사 이름
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="소환사 이름을 입력하세요"
                            />
                        </div>
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "var(--text-secondary)",
                                    marginBottom: "var(--spacing-xs)",
                                }}
                            >
                                게임 ID
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="분석받고 싶은 게임 ID를 입력하세요"
                            />
                        </div>
                        <button
                            className="btn btn-accent"
                            style={{ width: "100%" }}
                        >
                            분석 요청하기
                        </button>
                    </div>
                </div>

                <div className="card" style={{ padding: "var(--spacing-xl)" }}>
                    <h2
                        style={{
                            fontSize: "20px",
                            fontWeight: 600,
                            marginBottom: "var(--spacing-lg)",
                        }}
                    >
                        최근 피드백
                    </h2>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--spacing-lg)",
                        }}
                    >
                        <div
                            style={{
                                padding: "var(--spacing-lg)",
                                backgroundColor: "var(--neutral-50)",
                                borderRadius: "var(--radius-sm)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: "var(--spacing-lg)",
                                }}
                            >
                                <div>
                                    <h3
                                        style={{
                                            fontWeight: 500,
                                            marginBottom: "var(--spacing-xs)",
                                        }}
                                    >
                                        아칼리 vs 야스오 매치업
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            color: "var(--text-secondary)",
                                            marginBottom: 0,
                                        }}
                                    >
                                        레벨 6 이후 교전 타이밍을 더 신중하게
                                        잡아야 할 것 같습니다...
                                    </p>
                                </div>
                                <span
                                    style={{
                                        fontSize: "14px",
                                        color: "var(--text-secondary)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
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
