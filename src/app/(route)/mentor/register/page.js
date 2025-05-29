'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MentorRegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        game: '',
        tier: '',
        mainRole: '',
        subRole: '',
        champions: [],
        agents: [],
        introduction: '',
        experience: '',
        specialties: [],
        hourlyRate: '',
        availability: {
            monday: { available: false, startTime: '', endTime: '' },
            tuesday: { available: false, startTime: '', endTime: '' },
            wednesday: { available: false, startTime: '', endTime: '' },
            thursday: { available: false, startTime: '', endTime: '' },
            friday: { available: false, startTime: '', endTime: '' },
            saturday: { available: false, startTime: '', endTime: '' },
            sunday: { available: false, startTime: '', endTime: '' }
        },
        portfolio: '',
        socialLinks: {
            youtube: '',
            twitch: '',
            instagram: ''
        }
    });

    const [currentChampion, setCurrentChampion] = useState('');
    const [currentAgent, setCurrentAgent] = useState('');
    const [currentSpecialty, setCurrentSpecialty] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGameChange = (game) => {
        setFormData(prev => ({
            ...prev,
            game,
            champions: [],
            agents: [],
            mainRole: '',
            subRole: ''
        }));
    };

    const handleAvailabilityChange = (day, field, value) => {
        setFormData(prev => ({
            ...prev,
            availability: {
                ...prev.availability,
                [day]: {
                    ...prev.availability[day],
                    [field]: value
                }
            }
        }));
    };

    const handleSocialLinkChange = (platform, value) => {
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    const addChampion = () => {
        if (currentChampion && !formData.champions.includes(currentChampion)) {
            setFormData(prev => ({
                ...prev,
                champions: [...prev.champions, currentChampion]
            }));
            setCurrentChampion('');
        }
    };

    const removeChampion = (champion) => {
        setFormData(prev => ({
            ...prev,
            champions: prev.champions.filter(c => c !== champion)
        }));
    };

    const addAgent = () => {
        if (currentAgent && !formData.agents.includes(currentAgent)) {
            setFormData(prev => ({
                ...prev,
                agents: [...prev.agents, currentAgent]
            }));
            setCurrentAgent('');
        }
    };

    const removeAgent = (agent) => {
        setFormData(prev => ({
            ...prev,
            agents: prev.agents.filter(a => a !== agent)
        }));
    };

    const addSpecialty = () => {
        if (currentSpecialty && !formData.specialties.includes(currentSpecialty)) {
            setFormData(prev => ({
                ...prev,
                specialties: [...prev.specialties, currentSpecialty]
            }));
            setCurrentSpecialty('');
        }
    };

    const removeSpecialty = (specialty) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.filter(s => s !== specialty)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Mentor registration data:', formData);
        // TODO: API call to register mentor
        alert('멘토 등록이 완료되었습니다!');
        router.push('/mentor');
    };

    const lolRoles = ['탑', '정글', '미드', '원딜', '서포터'];
    const valorantRoles = ['듀얼리스트', '컨트롤러', '이니시에이터', '센티널'];
    const dayNames = {
        monday: '월요일',
        tuesday: '화요일',
        wednesday: '수요일',
        thursday: '목요일',
        friday: '금요일',
        saturday: '토요일',
        sunday: '일요일'
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, var(--neutral-50), rgba(147, 51, 234, 0.05))' }}>
            <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
                {/* Header */}
                <div className="card" style={{ 
                    borderRadius: 'var(--radius-lg)', 
                    padding: 'var(--spacing-2xl)', 
                    marginBottom: 'var(--spacing-2xl)',
                    border: '1px solid var(--neutral-100)' 
                }}>
                    <h1 style={{ 
                        background: 'linear-gradient(to right, var(--color-secondary), #8b5cf6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        멘토 등록
                    </h1>
                    <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>
                        전문 멘토로 등록하고 플레이어들의 성장을 도와주세요
                    </p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <div className="card" style={{ 
                        borderRadius: 'var(--radius-lg)', 
                        padding: 'var(--spacing-2xl)', 
                        marginBottom: 'var(--spacing-xl)',
                        border: '1px solid var(--neutral-100)' 
                    }}>
                        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>기본 정보</h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                    멘토 이름 *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="input"
                                    placeholder="멘토 활동명을 입력하세요"
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                    주 게임 *
                                </label>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                    <button
                                        type="button"
                                        onClick={() => handleGameChange('리그 오브 레전드')}
                                        className={`btn ${formData.game === '리그 오브 레전드' ? 'btn-primary' : 'btn-secondary'}`}
                                        style={{ flex: 1 }}
                                    >
                                        리그 오브 레전드
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleGameChange('발로란트')}
                                        className={`btn ${formData.game === '발로란트' ? 'btn-primary' : 'btn-secondary'}`}
                                        style={{ flex: 1 }}
                                    >
                                        발로란트
                                    </button>
                                </div>
                            </div>
                        </div>

                        {formData.game && (
                            <>
                                <div style={{ marginTop: 'var(--spacing-xl)' }}>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                        현재 티어 *
                                    </label>
                                    <input
                                        type="text"
                                        name="tier"
                                        value={formData.tier}
                                        onChange={handleInputChange}
                                        required
                                        className="input"
                                        placeholder={formData.game === '리그 오브 레전드' ? '예: 다이아몬드 2' : '예: 불멸 3'}
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)', marginTop: 'var(--spacing-xl)' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                            주 포지션 *
                                        </label>
                                        <select
                                            name="mainRole"
                                            value={formData.mainRole}
                                            onChange={handleInputChange}
                                            required
                                            className="input"
                                            style={{ width: '100%' }}
                                        >
                                            <option value="">선택하세요</option>
                                            {(formData.game === '리그 오브 레전드' ? lolRoles : valorantRoles).map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                            부 포지션
                                        </label>
                                        <select
                                            name="subRole"
                                            value={formData.subRole}
                                            onChange={handleInputChange}
                                            className="input"
                                            style={{ width: '100%' }}
                                        >
                                            <option value="">선택하세요</option>
                                            {(formData.game === '리그 오브 레전드' ? lolRoles : valorantRoles)
                                                .filter(role => role !== formData.mainRole)
                                                .map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Champions/Agents */}
                                <div style={{ marginTop: 'var(--spacing-xl)' }}>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                        주력 {formData.game === '리그 오브 레전드' ? '챔피언' : '요원'} (최대 5개)
                                    </label>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                                        <input
                                            type="text"
                                            value={formData.game === '리그 오브 레전드' ? currentChampion : currentAgent}
                                            onChange={(e) => formData.game === '리그 오브 레전드' ? setCurrentChampion(e.target.value) : setCurrentAgent(e.target.value)}
                                            className="input"
                                            placeholder={formData.game === '리그 오브 레전드' ? '챔피언 이름' : '요원 이름'}
                                            style={{ flex: 1 }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    formData.game === '리그 오브 레전드' ? addChampion() : addAgent();
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={formData.game === '리그 오브 레전드' ? addChampion : addAgent}
                                            className="btn btn-primary"
                                            disabled={(formData.game === '리그 오브 레전드' ? formData.champions : formData.agents).length >= 5}
                                        >
                                            추가
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                                        {(formData.game === '리그 오브 레전드' ? formData.champions : formData.agents).map(item => (
                                            <span
                                                key={item}
                                                className="tag tag-primary"
                                                style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}
                                            >
                                                {item}
                                                <button
                                                    type="button"
                                                    onClick={() => formData.game === '리그 오브 레전드' ? removeChampion(item) : removeAgent(item)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Professional Information */}
                    <div className="card" style={{ 
                        borderRadius: 'var(--radius-lg)', 
                        padding: 'var(--spacing-2xl)', 
                        marginBottom: 'var(--spacing-xl)',
                        border: '1px solid var(--neutral-100)' 
                    }}>
                        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>전문 정보</h2>
                        
                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                자기소개 *
                            </label>
                            <textarea
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleInputChange}
                                required
                                className="input"
                                rows={4}
                                placeholder="자신을 소개하고, 어떤 멘토링을 제공할 수 있는지 설명해주세요"
                                style={{ width: '100%', resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                경력 및 경험
                            </label>
                            <textarea
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                className="input"
                                rows={3}
                                placeholder="게임 관련 경력이나 특별한 경험이 있다면 작성해주세요"
                                style={{ width: '100%', resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                전문 분야
                            </label>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                                <input
                                    type="text"
                                    value={currentSpecialty}
                                    onChange={(e) => setCurrentSpecialty(e.target.value)}
                                    className="input"
                                    placeholder="예: 라인전, 팀파이트, 맵 리딩"
                                    style={{ flex: 1 }}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addSpecialty();
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={addSpecialty}
                                    className="btn btn-primary"
                                >
                                    추가
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                                {formData.specialties.map(specialty => (
                                    <span
                                        key={specialty}
                                        className="tag tag-accent"
                                        style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}
                                    >
                                        {specialty}
                                        <button
                                            type="button"
                                            onClick={() => removeSpecialty(specialty)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                시간당 수업료 (원) *
                            </label>
                            <input
                                type="number"
                                name="hourlyRate"
                                value={formData.hourlyRate}
                                onChange={handleInputChange}
                                required
                                className="input"
                                placeholder="예: 30000"
                                style={{ width: '100%' }}
                                min="0"
                                step="1000"
                            />
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="card" style={{ 
                        borderRadius: 'var(--radius-lg)', 
                        padding: 'var(--spacing-2xl)', 
                        marginBottom: 'var(--spacing-xl)',
                        border: '1px solid var(--neutral-100)' 
                    }}>
                        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>수업 가능 시간</h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            {Object.entries(dayNames).map(([dayKey, dayName]) => (
                                <div key={dayKey} style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: '120px 1fr', 
                                    alignItems: 'center', 
                                    gap: 'var(--spacing-lg)',
                                    padding: 'var(--spacing-md)',
                                    backgroundColor: formData.availability[dayKey].available ? 'rgba(147, 51, 234, 0.05)' : 'transparent',
                                    borderRadius: 'var(--radius-md)',
                                    transition: 'background-color var(--transition-fast)'
                                }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={formData.availability[dayKey].available}
                                            onChange={(e) => handleAvailabilityChange(dayKey, 'available', e.target.checked)}
                                            style={{ width: '20px', height: '20px' }}
                                        />
                                        <span style={{ fontWeight: 500 }}>{dayName}</span>
                                    </label>
                                    
                                    {formData.availability[dayKey].available && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                            <input
                                                type="time"
                                                value={formData.availability[dayKey].startTime}
                                                onChange={(e) => handleAvailabilityChange(dayKey, 'startTime', e.target.value)}
                                                className="input"
                                                style={{ width: 'auto' }}
                                            />
                                            <span>~</span>
                                            <input
                                                type="time"
                                                value={formData.availability[dayKey].endTime}
                                                onChange={(e) => handleAvailabilityChange(dayKey, 'endTime', e.target.value)}
                                                className="input"
                                                style={{ width: 'auto' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="card" style={{ 
                        borderRadius: 'var(--radius-lg)', 
                        padding: 'var(--spacing-2xl)', 
                        marginBottom: 'var(--spacing-xl)',
                        border: '1px solid var(--neutral-100)' 
                    }}>
                        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>추가 정보</h2>
                        
                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
                                포트폴리오 링크
                            </label>
                            <input
                                type="url"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleInputChange}
                                className="input"
                                placeholder="포트폴리오나 관련 자료 링크"
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-lg)', fontWeight: 500 }}>
                                소셜 미디어
                            </label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                    <span style={{ width: '100px' }}>YouTube</span>
                                    <input
                                        type="url"
                                        value={formData.socialLinks.youtube}
                                        onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                                        className="input"
                                        placeholder="YouTube 채널 링크"
                                        style={{ flex: 1 }}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                    <span style={{ width: '100px' }}>Twitch</span>
                                    <input
                                        type="url"
                                        value={formData.socialLinks.twitch}
                                        onChange={(e) => handleSocialLinkChange('twitch', e.target.value)}
                                        className="input"
                                        placeholder="Twitch 채널 링크"
                                        style={{ flex: 1 }}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                    <span style={{ width: '100px' }}>Instagram</span>
                                    <input
                                        type="url"
                                        value={formData.socialLinks.instagram}
                                        onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                                        className="input"
                                        placeholder="Instagram 프로필 링크"
                                        style={{ flex: 1 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-lg)' }}>
                        <button
                            type="button"
                            onClick={() => router.push('/mentor')}
                            className="btn btn-secondary"
                            style={{ minWidth: '150px' }}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ minWidth: '150px' }}
                        >
                            멘토 등록
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}